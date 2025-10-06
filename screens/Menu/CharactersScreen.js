import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import menuBg from '../../assets/images/MenuImage.png';

import NavigationPressable from '../../components/NavigationPressable';

function CharactersScreen({ navigation }) {
    const menuHandler = () => {
        navigation.navigate('Menu');
    };

    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Characters Screen</Text>
            </View>
            <NavigationPressable onPress={menuHandler} symbol="caret-left" />
        </ImageBackground>
    );
}

export default CharactersScreen;

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