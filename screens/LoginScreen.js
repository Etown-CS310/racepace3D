import { StyleSheet,ImageBackground,View } from 'react-native';
import bkimg from '../assets/images/Trackbg.png';

function LoginScreen({children}) 
{
    
    return(
        <ImageBackground 
        style={styles.bkimg}
        source={bkimg}
        >
            <View style={styles.container}>
                {children}
            </View>
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
    });