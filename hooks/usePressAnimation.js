import { useRef } from 'react';
import { Animated } from 'react-native';

export function usePressAnimation({
    pressedScale = 0.9,
    speedIn = 50,
    speedOut = 30,
    bounciness = 3,
} = {}) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: pressedScale,
            useNativeDriver: true,
            speed: speedIn,
            bounciness,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: speedOut,
            bounciness,
        }).start();
    };

    return { scale, handlePressIn, handlePressOut };
}