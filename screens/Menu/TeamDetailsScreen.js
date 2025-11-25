import { StyleSheet, Text, View, ImageBackground, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getSinglePerson, joinTeam, leaveTeam, deleteTeam } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';
import TextButton from '../../components/textButton';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function TeamScreen({ navigation, route, uid }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const [members, setMembers] = useState(route.params.team.members);
    
        // TODO: fix???
        useEffect(() => {
            async function fetchMembers() {
                setMembers(await members.map( async (member)=>{
                    const memberData = await getSinglePerson(member);
                    return memberData.username;
                }));
            }
            fetchMembers();
        }, []);

    //console.log(route.params.team);

    async function joinTeamHandler() {
        console.log('Join Team:', route.params.team);

        const response = await joinTeam(route.params.team);
        if (response) {
            navigation.goBack();
        } else {
            Alert.alert('Join Failed', 'There was an error joining the team.', [{ text: 'OK' }]);
        }
    }

    // TODO: add confimation popup
    async function leaveTeamHandler() {
        console.log('Leave Team:', route.params.team);

        const response = await leaveTeam(route.params.team);
        if (response) {
            navigation.goBack();
        } else {
            Alert.alert('Leave Failed', 'There was an error leaving the team.', [{ text: 'OK' }]);
        }
    }

    // TODO: add confimation popup
    async function deleteTeamHandler() {
        console.log('Delete Team:', route.params.team);

        const response = await deleteTeam(route.params.team);
        if (response) {
            navigation.goBack();
        } else {
            Alert.alert('Delete Failed', 'There was an error deleting the team.', [{ text: 'OK' }]);
        }
    }
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>{route.params.team.name}</Text>
                <View style={styles.scrollWrapper}>
                    <ScrollView 
                        style={styles.scrollContainer}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Text style={styles.text}>Description: {route.params.team.description}</Text>
                        <Text style={styles.text}>Members:</Text>
                        {members.map((member,index) =>{
                            return (
                                <Text key={index} style={styles.text}>- {member} {route.params.team.members[index]===route.params.team.captain ? "★" : ""}</Text>
                            );
                        })}
                        <View style={styles.textButton}>
                            {/* TODO: fix */}
                            {!members.some((member) => member.id === uid) ? (
                                <TextButton title="Join Team" onPress={joinTeamHandler} />
                            ) : uid === route.params.team.captain ? (
                                <TextButton title="Delete Team" onPress={deleteTeamHandler} />
                            ) : <TextButton title="Leave Team" onPress={leaveTeamHandler} />}
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