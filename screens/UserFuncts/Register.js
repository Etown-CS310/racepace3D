import {Text,View,StyleSheet,} from 'react-native';
import TextButton from '../../components/textButton';
import Input from '../../components/input';
import { useState } from 'react';

function Register() 
{
    const [userEmail, setUserEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');



    return 
    (
        <View>
            <Text>Register</Text>

        </View>
    );
}

export default Register;


const styles = StyleSheet.create({
    container:
    {
        
    },
    text:
    {

    },
});