import { StyleSheet, Text, View, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { createTeam } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/light/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';
import TextButton from '../../components/textButton';
import Input from '../../components/input';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function TeamScreen({ navigation }) {
    const [teamName, setTeamName] = useState('');
    const [teamDesc, setTeamDesc] = useState('');

    const menuHandler = () => {
        navigation.goBack();
    };

    async function createTeamHandler() {
        console.log('Create Team:', teamName, teamDesc);

        try {
            const response = await createTeam(teamName, teamDesc);
            if (!response) {
                throw new Error('Create team failed');
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Creation Failed');
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
                                <Text style={styles.text}>Create a New Team</Text>
                                <View style={styles.textContainer}>
                                    <Input title="Team Name" value={teamName} onChangeText={setTeamName} focus={true}/>
                                    <Input title="Description" value={teamDesc} onChangeText={setTeamDesc} isMultiline={true}/>
                                </View>
                                <View style={styles.textButton}>
                                    <TextButton title="Create Team" onPress={createTeamHandler}/>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg}/>
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

    text: {
        fontFamily: 'PressStart2P',
        color: 'white',
        fontSize: FONT_SIZES.title,
        textAlign: 'center',
        marginBottom: 15,
    },

    textContainer: {
        width: '80%',
        alignSelf: 'center',
        gap: 15,
    },

    textButton: {
        marginTop: 20,
        alignSelf: 'center',
        width: '50%',
    },
});