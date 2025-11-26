import { StyleSheet, Text, View, ImageBackground, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getSinglePerson, joinTeam, leaveTeam, deleteTeam, getMe } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';
import TextButton from '../../components/textButton';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function TeamScreen({ navigation, route }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const { team, uid } = route.params;
    const [members, setMembers] = useState(team.members);
    const [memberUsernames, setMemberUsernames] = useState([]);
    const [me, setMe] = useState(null);
    
        // TODO: fix???
        useEffect(() => {
            async function fetchMembers() {
                try {
                    const usernames = await Promise.all(
                        members.map(async (uid) => {
                            // get batch users???
                            const memberData = await getSinglePerson(uid);
                            return { uid, username: memberData.username };
                        })
                    );
                    setMemberUsernames(usernames);
                } catch (error) {
                    console.error('Error fetching member usernames:', error);
                }
            }
            fetchMembers();
        }, [members]);

        useEffect(() => {
            async function fetchMe() {
                const meData = await getMe();
                setMe(meData);
            }
            fetchMe();
        }, []);

    async function joinTeamHandler() {
        console.log('Join Team:', team);

        const originalMembers = [...members];
        setMembers([...members, uid]);

        try {
            const response = await joinTeam(team);
            if (!response) {
                throw new Error('Join team failed');
            }
            navigation.goBack();
        } catch (error) {
            setMembers(originalMembers);
            Alert.alert('Join Failed', error.message);
        }
    }

    async function leaveTeamHandler() {
        console.log('Leave Team:', team);

        Alert.alert(
            'Leave Team',
            'Are you sure?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Leave', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await leaveTeam(team);
                            if (!response) {
                                throw new Error('Leave team failed');
                            }
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Leave failed', error.message);
                        }
                    }
                }
            ]
        );
    }

    async function deleteTeamHandler() {
        console.log('Delete Team:', team);

        Alert.alert(
            'Delete Team',
            'Are you sure? This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await deleteTeam(team);
                            if (!response) {
                                throw new Error('Delete team failed');
                            }
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Delete failed', error.message);
                        }
                    }
                }
            ]
        );
    }
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>{team.name}</Text>
                <View style={styles.scrollWrapper}>
                    <ScrollView 
                        style={styles.scrollContainer}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Text style={styles.text}>Description: {team.description}</Text>
                        <Text style={styles.text}>Members:</Text>
                        {memberUsernames.map((member) => {
                            return (
                                <Text key={member.uid} style={styles.text}>
                                    - {member.username} {member.uid === team.captain ? "★" : ""}
                                </Text>
                            );
                        })}
                        <View style={styles.textButton}>
                            {team.captain === uid ? (
                                <TextButton title="Delete Team" onPress={deleteTeamHandler} />
                            ) : members.includes(uid) ? (
                                <TextButton title="Leave Team" onPress={leaveTeamHandler} />
                            ) : me?.teamID === -1 ? (
                                <TextButton title="Join Team" onPress={joinTeamHandler} />
                            ) : null}
                        </View>
                    </ScrollView>
                </View>
            </View>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
        </ImageBackground>
    );
}

export default TeamScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',    
        padding: 40,
        backgroundColor: COLORS.overlay,
    },

    title: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.title,
        marginBottom: 20,
        color: 'white',
    },

    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },

    scrollWrapper: {
        maxHeight: '80%',
        width: '80%',
    },

    scrollContainer: {
        borderRadius: 6,
        backgroundColor: COLORS.wrapper,
    },

    scrollContent: {
        padding: 20,
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.medium,
        marginBottom: 10,
    },

    textButton: {
        marginTop: 20,
        alignSelf: 'center',
        width: '50%',
    },
});