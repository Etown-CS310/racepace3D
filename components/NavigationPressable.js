import { View, StyleSheet, Pressable, Animated, Image } from 'react-native';
import { useRef } from 'react';

function NavigationPressable({ onPress, source, size=75 }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
            speed: 50,
            bounciness: 3,
        }).start();
    }

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 30,
        }).start();
    }

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