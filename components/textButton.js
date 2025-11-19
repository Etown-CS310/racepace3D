import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { usePressAnimation } from '../hooks/usePressAnimation';

function TextButton({ title, onPress }) {
    const { scale, handlePressIn, handlePressOut } = usePressAnimation();

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            <Pressable 
                style={styles.pressable}
                onPress={onPress} 
                onPressIn={handlePressIn} 
                onPressOut={handlePressOut}
            >
                <Text style={styles.text}>
                    {title}
                </Text>
            </Pressable>
        </Animated.View>
    );
}

export default TextButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    pressable: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: 12,
        color: 'white',
    },
});