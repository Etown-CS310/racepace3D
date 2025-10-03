import { StyleSheet, Text, Pressable, ImageBackground } from 'react-native';

function LevelPressable({ level, index, unlocked, onCurrentLevel, onSetMode }) {
    return (
        <Pressable
            key={index}
            style={styles.levelBox}
            onPress={() => {
            if (unlocked) {
                onCurrentLevel(index);
                onSetMode('play');
            }
            }}
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textAlign: 'center',
    },
});