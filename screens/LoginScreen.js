import { StyleSheet,ImageBackground,View,KeyboardAvoidingView, } from 'react-native';
import bkimg from '../assets/images/Trackbg.png';

function LoginScreen({children}) 
{
    
    return(
        <ImageBackground 
        style={styles.bkimg}
        source={bkimg}
        > 
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-50} style={styles.margContainer}>
            <View style={styles.container}>
                {children}
            </View>
        </KeyboardAvoidingView>
        </ImageBackground>
    );
}
export default LoginScreen;

const styles = StyleSheet.create(
    {
        bkimg: 
    {
        flex: 1,
        alignItems: 'center',
        
    },
    container:
    {
        margin:'auto',
        backgroundColor: 'rgba(190, 190, 190, 0.7);',
        width: 350,
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
    },
    margContainer:
    {
        margin:'auto',
    }
    });