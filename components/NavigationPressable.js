import { View, StyleSheet, Pressable, Animated, Image } from 'react-native';
import { usePressAnimation } from '../hooks/usePressAnimation';

function NavigationPressable({ onPress, source, size=75, style={} }) {
    const { scale, handlePressIn, handlePressOut } = usePressAnimation();

    return (
        <Pressable
            style={[style, { width: size, height: size }]}
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
    bgImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});