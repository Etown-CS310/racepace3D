import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState, useEffect, } from 'react';
import { login } from '../../components/dbConnecter';

import Input from '../../components/input';
import TextButton from '../../components/textButton';
import LoginScreen from '../LoginScreen';
import { refreshToken } from '../../components/dbConnecter';

function Login({navigation}) {
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    //console.log("LoginScreen");

    useEffect(()=>{
        async function checkToken() {
            if (await refreshToken())
                navigation.navigate('Menu');
        }
        checkToken();
    },[]);

    async function loginHandler() {
        //console.log(userEmail,userPass);
        //console.log("here");
        const response= await login(userEmail,userPass);
        
        //console.log(response);
        if(response)
            {
            navigation.navigate('Menu');
            }
        else
            Alert.alert("Login Failed","Incorrect email or password",[{text:"OK"}]);    
    }

    function regNavHandler() {
        navigation.navigate('Register');
    }

    return (
        <LoginScreen>
            <Text style={styles.text}>Login</Text>
            <View style={styles.textContainer}>
                <Input title="Email" value={userEmail} onChangeText={setUserEmail} focus={true}/>
                <Input title="Password" value={userPass} onChangeText={setUserPass}/>
            </View>
            <View style={styles.buttonContainer}>
                <TextButton title="Login" onPress={loginHandler}/>
                <TextButton title="Sign up" onPress={regNavHandler} />
            </View>
        </LoginScreen>
    );
}

export default Login;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'PressStart2P',
        color: 'white',
        fontSize: 30,
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