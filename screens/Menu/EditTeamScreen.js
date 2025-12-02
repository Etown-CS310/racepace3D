import { StyleSheet, Text, View, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { editTeam } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/light/LeftArrow.png';
import refreshimg from '../../assets/buttons/light/Refresh.png';

import NavigationPressable from '../../components/NavigationPressable';
import TextButton from '../../components/textButton';
import Input from '../../components/input';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';
import MemberButton from '../../components/MemberButton';

function TeamScreen({ navigation, route }) {
    const { team, memberUsernames } = route.params;
    const [teamName, setTeamName] = useState(team.name);
    const [teamDesc, setTeamDesc] = useState(team.description);
    const [teamMembers, setTeamMembers] = useState(team.members);

    const menuHandler = () => {
        navigation.goBack();
    };

    const refreshHandler = () => {
        setTeamName(team.name);
        setTeamDesc(team.description);
        setTeamMembers(team.members);
    };

    const toggleMemberHandler = (uid) => {
        setTeamMembers((prevMembers) => {
            if (prevMembers.includes(uid)) {
                return prevMembers.filter((memberUid) => memberUid !== uid);
            } else {
                return [...prevMembers, uid];
            }
        });
    };

    async function editTeamHandler() {
        const removedMembers = team.members.filter((uid) => !teamMembers.includes(uid));

        if (teamName === team.name && teamDesc === team.description && removedMembers.length === 0) {
            Alert.alert('No changes made');
            return;
        }

        console.log('Edit Team:', teamName, teamDesc, teamMembers, removedMembers);

        try {
            const response = await editTeam(teamName, teamDesc, teamMembers, removedMembers);
            if (!response) {
                throw new Error('Edit team failed');
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Edit Failed');
        }
    }
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                        style={styles.keyboardView}
                    >
                        <ScrollView 
                            contentContainerStyle={styles.scrollContainer}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.container}>
                                <Text style={styles.title}>Edit Team</Text>
                                <View style={styles.textContainer}>
                                    <Input title="Team Name" value={teamName} onChangeText={setTeamName}/>
                                    <Input title="Description" value={teamDesc} onChangeText={setTeamDesc} isMultiline={true}/>
                                </View>
                                <View style={styles.membersContainer}>
                                    {memberUsernames.map((member) => (
                                        <View key={member.uid} style={styles.memberItem}>
                                            <MemberButton
                                                name={member.username}
                                                captain={member.uid === team.captain}
                                                onPress={() => toggleMemberHandler(member.uid)}
                                                isDeleting={!teamMembers.includes(member.uid)}
                                            />
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.textButton}>
                                    <TextButton title="Save Team" onPress={editTeamHandler}/>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg}/>
            <NavigationPressable style={LAYOUT.forwardButton} onPress={refreshHandler} source={refreshimg}/>
        </ImageBackground>
    );
}

export default TeamScreen;

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignItems: 'center',   
    },

    overlay: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.overlay,
        paddingVertical: 20,
    },

    keyboardView: {
        flex: 1,
        width: '100%',
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        backgroundColor: COLORS.wrapper,
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        paddingHorizontal: 0,
        width: '70%',
    },

    title: {
        fontFamily: 'PressStart2P',
        color: 'white',
        fontSize: FONT_SIZES.title,
        textAlign: 'center',
        marginBottom: 15,
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.medium,
        lineHeight: FONT_SIZES.medium * 1.5,
        marginBottom: 10,
    },

    textContainer: {
        width: '80%',
        alignSelf: 'center',
        gap: 15,
    },

    textButton: {
        alignSelf: 'center',
        width: '50%',
    },

    membersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    memberItem: {
        width: '48.5%',
        marginTop: 15,
    },
});