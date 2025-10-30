import { View, StyleSheet, Pressable, Animated, Image } from 'react-native';
import { usePressAnimation } from '../hooks/usePressAnimation';

function NavigationPressable({ onPress, source, size=75 }) {
    const { scale, handlePressIn, handlePressOut } = usePressAnimation();

    return (
        <Pressable
            style={[styles.button, { width: size, height: size }]}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.Image
                source={source}
                style={[styles.bgImage, { transform: [{ scale }] }]}
            />
        </Pressable>
    );

}

export default NavigationPressable;

const styles = StyleSheet.create({
    button: {
        margin: 20
    },
    
    bgImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});