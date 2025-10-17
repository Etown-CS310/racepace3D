import { StyleSheet, Text, Pressable, ImageBackground, Animated } from 'react-native';
import { useRef } from 'react';

function LevelPressable({ id, level, index, unlocked, onCurrentLevel, onSetMode }) {
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
        <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable
                key={id}
                style={styles.levelBox}
                onPress={() => {
                if (unlocked) {
                    onCurrentLevel(index);
                    onSetMode('play');
                }
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <ImageBackground
                source={level.bg} // level image goes here
                style={styles.bgImage}
                imageStyle={{ opacity: unlocked ? 1 : 0.3 }} // dim if locked
                >
                <Text style={styles.levelText}>
                    {level.name} {unlocked ? '' : '\n🔒'}
                </Text>
                </ImageBackground>
            </Pressable>
        </Animated.View>
    );
}

export default LevelPressable;

const styles = StyleSheet.create({
    levelBox: {
        width: 300,
        height: 155,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelText: {
        fontFamily: 'PressStart2P',
        fontSize: 18,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textAlign: 'center',
    },
});