import { StyleSheet, Pressable, Image, Animated, View } from 'react-native';
import { useRef } from 'react';

function CharacterPressable({ character, onPress, isSelected }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 50,
        bounciness: 3,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        }).start();
    };

    return (
        <View style={[
            styles.outerWrapper,
            isSelected && styles.selectedWrapper
        ]}>
        <Animated.View
            style={[
                styles.outerWrapper,
                { transform: [{ scale }] },
            ]}
        >
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.characterBox}
            >
                <Image source={character.img} style={styles.charImage} resizeMode="contain" />
            </Pressable>
        </Animated.View>
        </View>
    );
}

export default CharacterPressable;

const styles = StyleSheet.create({
    outerWrapper: {
        marginHorizontal: 10,
        padding: 1,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'transparent',
        width: 80, // adjust to fit grid
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedWrapper: {
        borderColor: 'yellow',
    },
    characterBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    charImage: {
        width: '100%',
        height: '100%',
    },
});