import { StyleSheet, Text, View, Image, ImageBackground,ScrollView } from 'react-native';

import { useEffect, useState } from 'react';
import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/light/LeftArrow.png';
import { getHighScores } from '../../components/dbConnecter.js';

import NavigationPressable from '../../components/NavigationPressable';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';
import PlayerCard from '../../components/PlayerCard.js';

function HighscoresScreen({ navigation,chars }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const [highScores, setHighScores] = useState([]);
    
    useEffect(() => {
        async function fetchHighScores() {
            const fetchedHighScores = await getHighScores();
            setHighScores(fetchedHighScores);
        }
        fetchHighScores();

    }, []);

    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container} >
                <Text style={styles.title}>Highscores Screen</Text>
                <ScrollView style={styles.scoresList} contentContainerStyle={{justifyContent:'center'}}>
                    {highScores.map((score, index) => (
                        <View key={index} style={styles.score}>
                            <Text style={styles.scoreText}>
                                {index +1}. {score.username}: {score.highScore}
                            </Text>
                            <Image
                                source={chars[score.char].img}
                                style={styles.charImage}
                                resizeMode="contain"
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
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
        backgroundColor: COLORS.overlay,
    },

    title: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.title,
        marginBottom: 20,
        color: 'white',
    },

    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },
    
    score: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.wrapper,
        borderRadius: 6,
        margin: 5,
        padding: 10,
        width: 500,
    },

    scoreText:{
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.medium,
        color: 'black',
    },

    scoresList:{
        marginBottom: 30,
    },

    title: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.title,
        marginBottom: 20,
        color: 'white',
    },

    charImage: {
        height: 60,
    },
});