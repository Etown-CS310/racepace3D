import { StyleSheet, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

function NavigationPressable({ onPress, symbol }) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <FontAwesome6 name={symbol} size={30} color="black" />
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
        margin: 20,
    },
});