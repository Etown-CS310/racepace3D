import { StyleSheet, View, Text, Button, Pressable, ImageBackground, ScrollView, Animated } from 'react-native';

import menuBg from '../assets/images/MenuImage.png';

import NavigationPressable from '../components/NavigationPressable.js';

import startimg from '../assets/images/Start.png';
import charimg from '../assets/images/Characters.png';
import highscoreimg from '../assets/images/Highscores.png';
import friendimg from '../assets/images/Friends.png';
import teamimg from '../assets/images/Teams.png';

function MenuScreen({ navigation }) {

    const navigationHandler = (screen) => {
        navigation.navigate(screen);
    }

    const buttons = [
        {screen: 'Characters', source: charimg},
        {screen: 'Highscores', source: highscoreimg},
        {screen: 'Friends', source: friendimg},
        {screen: 'Team', source: teamimg},
    ];

    return(
        <ImageBackground
            source={ menuBg }
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>

                <Text style={styles.title}> RacePace3D</Text>
                <NavigationPressable onPress={() => navigationHandler('Game')} source={startimg} size={150}/>
            </View>

            <View style={styles.buttonsContainer}>
                {buttons.map((btn) => (
                    <NavigationPressable
                        key={btn.screen}
                        onPress={() => navigationHandler(btn.screen)}
                        source={btn.source}
                    />
                ))}
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

    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonsContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },

    lowbutton: {
        width: 10,
        height: 10,
    },
});