import Login from './UserFuncts/Login';
import { View,StyleSheet } from 'react-native';

function LoginScreen({navigation}) 
{
    return(
        <View style={styles.container}>
            <Login nav={navigation} />
        </View>
    );
}
export default LoginScreen;

const styles = StyleSheet.create(
    {
        container: 
    {
        flex: 1,
        backgroundColor: 'rgba(47, 43, 43, 1)',
        alignItems: 'center',
        margin:30,
    },
    });