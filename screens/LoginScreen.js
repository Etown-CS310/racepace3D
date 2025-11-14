import { StyleSheet,ImageBackground,View,KeyboardAvoidingView, } from 'react-native';
import bkimg from '../assets/images/Trackbg.png';

function LoginScreen({children, width=350}) 
{
    
    return(
        <ImageBackground 
        style={styles.bkimg}
        source={bkimg}
        > 
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-70} style={styles.margContainer}>
            <View style={[styles.container,{width:width}]}>
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
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
    },
    margContainer:
    {
        margin:'auto',
    }
    });