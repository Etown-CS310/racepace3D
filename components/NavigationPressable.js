import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRef } from 'react';

function NavigationPressable({ onPress, symbol }) {
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
        <Pressable style={styles.button} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={{ transform: [{ scale }] }}>
                <FontAwesome6 name={symbol} size={30} color="black" />
            </Animated.View>
        </Pressable>
    );
}

export default NavigationPressable;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        margin: 20,
    },
    circleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pixel: {
        width: 7,
        height: 7,
        margin: 0,
        padding: 0,
        gap: 0,
        backgroundColor: 'black',
        display: 'flex',
    },
    // emptyPixel: {
    //     width: 4,
    //     height: 4,
    //     margin: 0,
    //     padding: 0,
    //     gap: 0,
    //     // opacity: 0,
    //     display: 'flex',
    // },
    symbolWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    symbolPixel: {
        width: 4,
        height: 4,
        margin: 0,
        padding: 0,
        gap: 0,
        backgroundColor: 'white',
        display: 'flex',
    },
    emptySymbolPixel: {
        width: 4,
        height: 4,
        margin: 0,
        padding: 0,
        gap: 0,
        // opacity: 0,
        display: 'flex',
    },
});