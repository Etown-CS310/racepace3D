import { View,Text,StyleSheet,Alert, } from 'react-native';
import { useState } from 'react';
import { login } from '../../components/dbConnecter';

import Input from '../../components/input';
import TextButton from '../../components/textButton';
import LoginScreen from '../LoginScreen';



function Login({navigation})
{
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    //console.log("LoginScreen");

    async function loginHandler()
    {
        
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

    function regNavHandler()
    {
        navigation.navigate('Register');
    }

    return(
        <LoginScreen>
                <Text style={styles.text}>Login</Text>
                <View style={styles.textInput}>
                    <Input style={styles.textInput} title="Email" value={userEmail} onChangeText={setUserEmail} focus={true}/>
                    <Input style={styles.textInput} title="Password" value={userPass} onChangeText={setUserPass}/>
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
    text:
    {
        fontFamily: 'PressStart2P',
        //marginTop:"10%",
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
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop:10,
        width:'80%',
        alignItems: 'center',
        height:100,
    },
});