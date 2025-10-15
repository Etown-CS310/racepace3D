import { StyleSheet, View, Text, Button, Pressable, ImageBackground, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import menuBg from '../assets/images/MenuImage.png';

import NavigationPressable from '../components/NavigationPressable.js';

function MenuScreen({ navigation }) {

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

                <Pressable style={styles.button} onPress={gameHandler}>
                    <FontAwesome6 name="caret-right" size={100} color="white" />
                </Pressable>

            </View>

            <View style={styles.buttonsContainer}>
                <NavigationPressable onPress={charactersHandler} symbol="person-running"/>
                <NavigationPressable onPress={highscoresHandler} symbol="trophy"/>
                <NavigationPressable onPress={friendsHandler} symbol="user-group"/>
                <NavigationPressable onPress={teamHandler} symbol="users"/>
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
});