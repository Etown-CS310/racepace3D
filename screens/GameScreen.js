import { useState } from 'react';
import { StyleSheet, View, Text, Button, Pressable, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// https://oblador.github.io/react-native-vector-icons/#Ionicons

import Track from './Game/Track.js';
import Forest from './Game/Forest.js';
import Mountain from './Game/Mountain.js';
import Desert from './Game/Desert.js';
import Road from './Game/Road.js';
import Space from './Game/Space.js';

import trackbg from '../images/Trackbg.png';
import forestbg from '../images/Forestbg.png';
import mountainbg from '../images/Mountainbg.png';
import desertbg from '../images/Desertbg.png';
import roadbg from '../images/Roadbg.png';
import spacebg from '../images/Spacebg.png';
// import racepacebg from '../images/Track_darkmode.png';

import LevelPressable from '../components/LevelPressable.js';
import NavigationPressable from '../components/NavigationPressable.js';

const lvls = [
    { id: 'track', name: "Track", component: Track, bg: trackbg },
    { id: 'forest', name: "Forest", component: Forest, bg: forestbg },
    { id: 'mountain', name: "Mountain", component: Mountain, bg: mountainbg },
    { id: 'desert', name: "Desert", component: Desert, bg: desertbg },
    { id: 'road', name: "Road", component: Road, bg: roadbg },
    { id: 'space', name: "Space", component: Space, bg: spacebg },
];

function GameScreen({ onChangeScreen }) {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [unlockedLevels, setUnlockedLevels] = useState([lvls[0].id]);
    const[mode, setMode] = useState('selectLvl'); // in the game or between levels (play or selectLvl)

    const LvlComponent = lvls[currentLevel].component;

    const completeLevelHandler = () => {
        const nextLevel = currentLevel + 1;
        if (nextLevel < lvls.length) {
            const nextLevelId = lvls[nextLevel].id;

            if (!unlockedLevels.includes(nextLevelId)) {
                setUnlockedLevels([...unlockedLevels,nextLevelId]);
            }
        }


    
        setMode('selectLvl');
        
    };

    const failedLevelHandler = () => {

        setMode('selectLvl');
    };

    const currentLevelHandler = (index) => {
        setCurrentLevel(index);
    };

    const setModeHandler = (selectedMode) => {
        setMode(selectedMode);
    };

    const menuHandler = () => {
        onChangeScreen('menu');
    };

    if (mode === 'play') {
    return(
        <View style={styles.container}>
            <Text style={styles.title}> Current Level: {lvls[currentLevel].name}</Text>

            {/* <LvlComponent /> */}

            <Button title="Complete Level" onPress={completeLevelHandler} />
            <Button title="Level Failed" onPress={failedLevelHandler} />

        </View>
    );
    } else if (mode === 'selectLvl') {

        return (
            <ImageBackground
                source={lvls[currentLevel].bg} // background image goes here
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.container}>

                    <Text style={styles.title}> Select Level</Text>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.levelList}
                    >
                        {lvls.map((level, index) => {
                            const unlocked = unlockedLevels.includes (level.id);
                            return (
                                <LevelPressable
                                    key={level.id}
                                    level={level}
                                    index={index}
                                    unlocked={unlocked}
                                    onCurrentLevel={currentLevelHandler}
                                    onSetMode={setModeHandler}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
                <NavigationPressable onPress={menuHandler} symbol="caret-back" />
            </ImageBackground>
        );
    }
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',    
        paddingTop: 40,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBotton: 20,
    },

    levelList: {
        marginTop: 30,
        alignitems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    levelBox: {
        width: 100,
        height: 175,
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
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});