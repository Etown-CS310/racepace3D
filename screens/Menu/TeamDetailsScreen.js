import { StyleSheet, Text, View, ImageBackground, ScrollView, Alert,Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getSinglePerson, joinTeam, leaveTeam, deleteTeam, getMe, getTeam } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/light/LeftArrow.png';
import editimg from '../../assets/buttons/light/Edit.png';

import NavigationPressable from '../../components/NavigationPressable';
import TextButton from '../../components/textButton';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function TeamScreen({ navigation, route, chars }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const editHandler = () => {
        navigation.navigate('EditTeam', { team: team, memberUsernames: memberUsernames });
    };

    const { uid } = route.params;
    const [team, setTeam] = useState(route.params.team);
    const [members, setMembers] = useState(team.members);
    const [memberUsernames, setMemberUsernames] = useState([]);
    const [me, setMe] = useState(null);

    useFocusEffect(
        useCallback(() => {
            async function pageRefresh() {
                try {
                    const updatedTeam = await getTeam(team.captain);
                    if (updatedTeam) {
                        setTeam(updatedTeam);
                        setMembers(updatedTeam.members);
                    }

                    const usernames = await Promise.all(
                        updatedTeam.members.map(async (uid) => {
                            const memberData = await getSinglePerson(uid);
                            if(memberData.score == undefined)
                                memberData.score = { highScore: 0 };
                            return { uid, username: memberData.username, highScore: memberData.score.highScore,char: memberData.char.id };
                        })
                    );
                    setMemberUsernames(usernames.sort((a, b) => b.highScore - a.highScore));

                    const meData = await getMe();
                    setMe(meData);
                } catch (error) {
                    console.error('Error refreshing page:', error);
                }
            }
            pageRefresh();
        }, [])
    );

    async function joinTeamHandler() {
        console.log('Join Team:', team);

        try {
            const response = await joinTeam(team);
            if (!response) {
                throw new Error('Join team failed');
            }
            navigation.goBack();
        } catch (error) {
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
                                <View key={member.uid} style={styles.memRow}>
                                    <View style={styles.userContainer}>
                                        <View style={styles.leftContent}>
                                            <Text style={styles.text}>
                                                {member.uid === team.captain ? "★" : "-"}  {member.username} 
                                            </Text>
                                            <Image 
                                                source={chars[member.char].img} 
                                                style={styles.charImage}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <Text style={styles.text}>
                                            High Score: {member.highScore}
                                        </Text>
                                    </View>
                                </View>
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
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg}/>
            {team.captain === uid && (
                <NavigationPressable style={LAYOUT.forwardButton} onPress={editHandler} source={editimg}/>
            )}
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
        lineHeight: FONT_SIZES.medium * 1.5,
        marginBottom: 10,
    },

    textButton: {
        alignSelf: 'center',
        width: '50%',
    },

    memRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },

    userContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    charImage: {
        height: 50,
        marginLeft: 10,
        marginBottom: 10,
    },
});