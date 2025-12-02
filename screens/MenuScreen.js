import { StyleSheet, View, Text, ImageBackground, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import menuBg2 from '../assets/images/title.png';

import NavigationPressable from '../components/NavigationPressable.js';

import startimg from '../assets/buttons/dark/Start.png';
import charimg from '../assets/buttons/dark/Characters.png';
import highscoreimg from '../assets/buttons/dark/Highscores.png';
import friendimg from '../assets/buttons/dark/Friends.png';
import teamimg from '../assets/buttons/dark/Teams.png';
import loginimg from '../assets/buttons/dark/Logout.png';

import { FONT_SIZES, LAYOUT } from '../constants/';

function MenuScreen({ navigation }) {

    const navigationHandler = (screen) => {
        if(screen==='Login')
        {
            SecureStore.deleteItemAsync('token');
        }
        navigation.navigate(screen);
    }

    const buttons = [
        {screen: 'Characters', source: charimg},
        {screen: 'Highscores', source: highscoreimg},
        {screen: 'Friends', source: friendimg},
        {screen: 'Team', source: teamimg},
        {screen: 'Login', source: loginimg},
    ];

    return(
        <ImageBackground
            source={ menuBg2 }
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>

                <Text style={[styles.title,Platform.isPad&&styles.iPadTitle]}> RacePace3D</Text>
                <NavigationPressable style={LAYOUT.button} onPress={() => navigationHandler('Game')} source={startimg} size={150}/>
            </View>

            <View style={styles.buttonsContainer}>
                {buttons.map((btn) => (
                    <NavigationPressable
                        key={btn.screen}
                        style={LAYOUT.button}
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
        fontSize: FONT_SIZES.title,
        color: 'white',
        paddingBottom: 10,
        marginBottom: 10,
    },

    iPadTitle: 
    {
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
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
});