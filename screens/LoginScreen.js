import Login from './UserFuncts/Login';
import { View,StyleSheet } from 'react-native';

function LoginScreen() 
{
    return(
        <View style={styles.container}>
            <Login />
        </View>
    );
}
export default LoginScreen;

const styles = StyleSheet.create(
    {
        container: 
    {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        alignItems: 'center',
        margin:30,
    },
    });