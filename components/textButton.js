import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { usePressAnimation } from '../hooks/usePressAnimation';

import { FONT_SIZES } from '../constants/theme';

function TextButton({ title, onPress }) {
    const { scale, handlePressIn, handlePressOut } = usePressAnimation();

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            <Pressable 
                style={styles.button}
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

    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.small,
        color: 'white',
        lineHeight: 18,
    },
});