import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Pressable, ImageBackground, ScrollView } from 'react-native';

// level components
import Track from './Game/Track.js';
import Forest from './Game/Forest.js';
import Mountain from './Game/Mountain.js';
import Desert from './Game/Desert.js';
import Road from './Game/Road.js';
import Space from './Game/Space.js';

// level background images
import trackbg from '../assets/images/Trackbg.png';
import forestbg from '../assets/images/Forestbg.png';
import mountainbg from '../assets/images/Mountainbg.png';
import desertbg from '../assets/images/Desertbg.png';
import roadbg from '../assets/images/Roadbg.png';
import spacebg from '../assets/images/Spacebg.png';

// navigation
import backimg from '../assets/buttons/LeftArrow.png';
import LevelPressable from '../components/LevelPressable.js';
import NavigationPressable from '../components/NavigationPressable.js';
import { useRoute } from '@react-navigation/native';

import { LAYOUT } from '../constants/layout';

// levels (id, name, component, background)
const lvls = [
    { id: 'track', name: "Track", component: Track, bg: trackbg },
    { id: 'forest', name: "Forest", component: Forest, bg: forestbg },
    { id: 'mountain', name: "Mountain", component: Mountain, bg: mountainbg },
    { id: 'desert', name: "Desert", component: Desert, bg: desertbg },
    { id: 'road', name: "Road", component: Road, bg: roadbg },
    { id: 'space', name: "Space", component: Space, bg: spacebg },
];

function GameScreen({ navigation, currentCharacter, chars }) {
    const route = useRoute();
    const selectedMode = route.params?.mode || 'selectLvl';
    const [currentLevel, setCurrentLevel] = useState(0);
    const [unlockedLevels, setUnlockedLevels] = useState([lvls[0].id]);
    const [mode, setMode] = useState(selectedMode); // in the game or between levels (play or selectLvl)
    const [beaten, setBeaten] = useState([]); // is level beaten

    // const LvlComponent = lvls[currentLevel].component; - is this needed? 

    useEffect(() => {
        if (route.params?.mode) {
            setMode(route.params.mode);
        }
    }, [route.params?.mode]);

    const completeLevelHandler = () => {

        // unlocks next level if there is one
        const nextLevel = currentLevel + 1;
        if (nextLevel < lvls.length) {
            const nextLevelId = lvls[nextLevel].id;

            if (!unlockedLevels.includes(nextLevelId)) {
                setUnlockedLevels([...unlockedLevels,nextLevelId]);
            }
        }
        // adds level completed to be beaten lvl list
        const thisLvlId = lvls[currentLevel].id;
        setBeaten(function (previousLevels) {
            if (previousLevels.includes(thisLvlId)) {
                return previousLevels;
            } else {
                return [...previousLevels, thisLvlId];
            }
        });
    };

    const exitLevelHandler = (won) => {
        if (won) {
            completeLevelHandler();
        }
        setMode('selectLvl');
    };

    const nextLevelHandler = () => {
        completeLevelHandler();
        setCurrentLevel(currentLevel + 1);
        setMode('play');
    };

    const failedLevelHandler = () => {
        setMode('selectLvl');
    };

    // sets the current level when its selected
    const currentLevelHandler = (index) => {
        setCurrentLevel(index);
    };

    // sets mode between play and selectLvl
    const setModeHandler = (selectedMode) => {
        setMode(selectedMode);
    };

    // navigates back to main menu
    const menuHandler = () => {
        navigation.goBack();
    };

    // either displays a level or the level selection screen
    if (mode === 'play') {
        let bg;
        if (lvls[currentLevel].bg == null) bg = lvls[currentLevel - 1].bg; // after beating space, there is no next level, so use previous bg
        else bg = lvls[currentLevel].bg;
        
        const LvlComponent = lvls[currentLevel].component;
        const isFreePlay = beaten.includes(lvls[currentLevel].id);
        return(
            <View style={{flex: 1}}>
                <LvlComponent
                    background={bg}
                    onNext={nextLevelHandler}
                    onExit={exitLevelHandler}
                    playerCharacter={chars[currentCharacter].img}
                    freePlay={isFreePlay}
                />
            </View>
        );
    } else if (mode === 'selectLvl') {
        return (

            // background image goes here
            <ImageBackground
                source={lvls[currentLevel].bg}
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.75 }}
                resizeMode="cover"
            >
                <View style={styles.container}>
                    <Text style={styles.title}> Select Level</Text>

                    <View style={styles.scrollContainer}>
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
                </View>
                <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
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
        paddingBottom: 20,
    },

    title: {
        fontFamily: 'PressStart2P',
        fontSize: 25,
        marginBottom: 20,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    scrollContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    levelList: {
        alignItems: 'center',
        paddingHorizontal: 10,
        flexGrow: 1,
        justifyContent: 'center', // This centers when content is smaller than container
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

    levelText: {
        fontFamily: 'PressStart2P',
        fontSize: 18,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textAlign: 'center',
    },

    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});