import {Text,View,StyleSheet,Alert,} from 'react-native';
import TextButton from '../../components/textButton';
import Input from '../../components/input';
import { useState } from 'react';
import { signUp } from '../../components/dbConnecter';
import LoginScreen from '../LoginScreen';

function Register({navigation}) 
{
    const [userEmail, setUserEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    async function registrationHandler()
    {
        
        if(userEmail !== confirmEmail)
        {
            Alert.alert("Look again","Emails do not match",[{text:"OK"}]);
            return;
        }
        
        if(userPass !== confirmPass)
        {
            Alert.alert("Look again","Passwords do not match",[{text:"OK"}]);
            return;
        }
        
        if(userPass.length < 6)
        {
            
            Alert.alert("Password requirements","Passwords must be at least 6 characters long.",[{text:"OK"}]);
            return;
        }
        if(!userEmail.includes('@'))
        {
            Alert.alert("Input Email","What you entered is not an email address.",[{text:"OK"}]);
        }
        //console.log("Registered:",userEmail,confirmEmail,userPass,confirmPass);
        const response= await signUp(userEmail,userPass);
        if(response)
            navigation.navigate('Menu');

    }

    function loginNavHandler()
    {
        navigation.goBack();
    }

    return (
        <LoginScreen width={600}>
            <Text style={styles.text}>Register</Text>
            
            <View style={styles.textInput}>
                <View style={styles.sbsTextInput}>
                    <Input style={styles.textInput} title="Email" value={userEmail} onChangeText={setUserEmail} focus={true}/>
                    <Input style={styles.textInput} title="Confirm Email" value={confirmEmail} onChangeText={setConfirmEmail}/>
                </View>
                <View style={styles.sbsTextInput}>
                    <Input style={styles.textInput} title="Password" value={userPass} onChangeText={setUserPass}/>
                    <Input style={styles.textInput} title="Confirm Password" value={confirmPass} onChangeText={setConfirmPass}/>
                </View>
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
    text:
    {
        //marginTop:"10%",
        fontFamily: 'PressStart2P',
        color: 'white',
        fontSize: 30,
        fontWeight: 800,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        textAlign: 'center',
    },
    textInput:
    {
        width: 250,
        textAlign: 'center',
    },
    buttonContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:'80%',
        alignSelf:'flex-start',
        height:40,
    },
    sbsTextInput:
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf:'center',
    },
});