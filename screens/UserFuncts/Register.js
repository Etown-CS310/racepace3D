import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import TextButton from '../../components/textButton';
import Input from '../../components/input';
import { useState } from 'react';
import { signUp } from '../../components/dbConnecter';
import LoginScreen from '../LoginScreen';

import { FONT_SIZES } from '../../constants/theme';

function Register({navigation}) {
    const [userEmail, setUserEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [username, setUsername]= useState('');

    async function registrationHandler() { 
        if(userEmail !== confirmEmail) {
            Alert.alert("Look again","Emails do not match",[{text:"OK"}]);
            return;
        }
        
        if(userPass !== confirmPass) {
            Alert.alert("Look again","Passwords do not match",[{text:"OK"}]);
            return;
        }
        
        if(userPass.length < 6) {
            
            Alert.alert("Password requirements","Passwords must be at least 6 characters long.",[{text:"OK"}]);
            return;
        }
        
        if(!userEmail.includes('@')) {
            Alert.alert("Input Email","What you entered is not an email address.",[{text:"OK"}]);
            return;
        }
        
        //console.log("Registered:",userEmail,confirmEmail,userPass,confirmPass);
        const response= await signUp(userEmail,userPass,username);

        if (response)
            navigation.navigate('Menu');
    }

    function loginNavHandler() {
        navigation.goBack();
    }

    return (
        <LoginScreen>
            <Text style={styles.text}>Register</Text>
            
            <View style={styles.textContainer}>
                <Input title="Email" value={userEmail} onChangeText={setUserEmail} focus={true}/>
                <Input title="Confirm Email" value={confirmEmail} onChangeText={setConfirmEmail}/>
                <Input title="Password" value={userPass} onChangeText={setUserPass}/>
                <Input title="Confirm Password" value={confirmPass} onChangeText={setConfirmPass}/>
                <Input title="Username" value={username} onChangeText={setUsername}/>
            </View>
            <View style={styles.buttonContainer}>
                <TextButton title="Register" onPress={registrationHandler}/>
                <TextButton title="Back to Login" onPress={loginNavHandler}/>
            </View>
        </LoginScreen>
    );
}

export default Register;


const styles = StyleSheet.create({
    text: {
        fontFamily: 'PressStart2P',
        color: 'white',
        fontSize: FONT_SIZES.title,
        textAlign: 'center',
        marginBottom: 15,
    },

    textContainer: {
        width: '80%',
        gap: 15,
    },
    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        alignItems: 'center',
        gap: 15,
        marginTop: 15,
    },
});