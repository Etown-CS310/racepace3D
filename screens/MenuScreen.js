import { StyleSheet, View, Text, Button, Pressable, ImageBackground, ScrollView, Animated } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import menuBg from '../assets/images/MenuImage.png';

import NavigationPressable from '../components/NavigationPressable.js';

import charimg from '../assets/images/Charselect.png';
import highscoreimg from '../assets/images/Highscoores.png';
import friendsimg from '../assets/images/Friends.png';
import teamimg from '../assets/images/Teams.png';

function MenuScreen({ navigation }) {

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

    const gameHandler = () => {
        navigation.navigate('Game');
    };

    const charactersHandler = () => {
        navigation.navigate('Characters');
    };

    const highscoresHandler = () => {
        navigation.navigate('Highscores');
    };

    const friendsHandler = () => {
        navigation.navigate('Friends');
    };

    const teamHandler = () => {
        navigation.navigate('Team');
    };

    return(
        <ImageBackground
            source={ menuBg }
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>

                <Text style={styles.title}> RacePace3D</Text>

                <Animated.View style={{ transform: [{ scale }] }}>
                    <Pressable style={styles.button} onPress={gameHandler} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                        <FontAwesome6 name="caret-right" size={100} color="white" />
                    </Pressable>
                </Animated.View>

            </View>

            <View style={styles.buttonsContainer}>
                <NavigationPressable onPress={charactersHandler} source={charimg}/>
                <NavigationPressable onPress={highscoresHandler} source={highscoreimg}/>
                <NavigationPressable onPress={friendsHandler} source={friendsimg}/>
                <NavigationPressable onPress={teamHandler} source={teamimg}/>
            </View>
        </ImageBackground>
    );


}

export default MenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',    
        paddingTop: 40,
    },

    title: {
        fontFamily: 'PressStart2P',
        fontSize: 35,
        color: 'white',
        paddingBottom: 10, // title will fit on screen
        marginBottom: 10,
    },

    button: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginBottom: 0,
    },

    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonsContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },

    lowbutton: {
        width: 10,
        height: 10,
    },
});