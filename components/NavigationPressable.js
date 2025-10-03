import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function NavigationPressable({ onPress, symbol }) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Ionicons name={symbol} size={35} color="black" />
        </Pressable>
    );
}

export default NavigationPressable;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 4,
        margin: 20,
    },
});