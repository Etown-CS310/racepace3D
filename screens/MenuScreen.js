import { StyleSheet, View, Text, Button, Pressable, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import menuBg from '../images/MenuImage.png';

function MenuScreen({ onChangeScreen }) {

    const gameHandler = () => {
        onChangeScreen('game');
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
                    <Ionicons name="caret-forward" size={75} color="white" />
                </Pressable>

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
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },

    button: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8,
        margin: 20,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});