import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import menuBg from '../../assets/images/MenuImage.png';

import NavigationPressable from '../../components/NavigationPressable';

function HighscoresScreen({ navigation }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Highscores Screen</Text>
            </View>
            <NavigationPressable onPress={menuHandler} symbol="back" />
        </ImageBackground>
    );
}

export default HighscoresScreen;

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
        fontSize: 25,
        marginBottom: 20,
        color: 'white',
    },

    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});