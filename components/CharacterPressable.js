import { Text, StyleSheet, Pressable, ImageBackground, Animated, View } from 'react-native';
import { usePressAnimation } from '../hooks/usePressAnimation';
import { FONT_SIZES } from '../constants/theme';

function CharacterPressable({ character, unlocked, onPress, isSelected }) {
    const { scale, handlePressIn, handlePressOut } = usePressAnimation();

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
                onPress={() => { if (unlocked) onPress(); }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.characterBox}
            >
                <ImageBackground
                    source={character.img}
                    style={styles.charImage}
                    imageStyle={{ opacity: unlocked ? 1 : 0.3 }}
                    resizeMode="contain"
                >
                    <Text style={styles.lock}>{unlocked ? '' : '🔒'}</Text>
                </ImageBackground>
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
        width: 80,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    lock: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.large,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textAlign: 'center',
    },
});