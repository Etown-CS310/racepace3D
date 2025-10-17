import { View,Text,StyleSheet, } from 'react-native';
import { useState } from 'react';
import { login } from '../../components/dbConnecter';

import Input from '../../components/input';
import TextButton from '../../components/textButton';



function Login()
{
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    //console.log("LoginScreen");

    async function loginHandler()
    {
        //console.log(userEmail,userPass);
        const id= await login(userEmail,userPass);
        
    }

    return(
        <View>
            <Text style={styles.text}>Login</Text>
            <Input style={styles.textInput} title="Email" value={userEmail} onChangeText={setUserEmail}/>
            <Input style={styles.textInput} title="Password" value={userPass} onChangeText={setUserPass}/>
            <TextButton title="Login" onPress={loginHandler}/>
        </View>
    );


}

export default Login;

const styles = StyleSheet.create({
    text:
    {
        color: 'white',
        fontSize: 30,
        fontWeight: 500,
    },
    textInput:
    {
        width: 600,
    },
    
});