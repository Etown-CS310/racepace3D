import { StyleSheet, View, Text, Button, Pressable, ImageBackground, FlatList, ScrollView } from 'react-native';

import menuBg from '../../assets/images/title.png';

import backimg from '../../assets/buttons/light/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';
import CharacterPressable from '../../components/CharacterPressable';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function CharactersScreen({ navigation, currentCharacter, characterHandler, chars }) {

    const menuHandler = () => {
        navigation.goBack();
    };

    const renderCharacter = ({item, index}) => {
        return (
            <CharacterPressable
                key={item.id}
                character={item}
                unlocked={item.unlocked}
                onPress={() => characterHandler(index)}
                isSelected={currentCharacter === index}
            />
        );
    };

    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >

            <View style={styles.container}>
                <Text style={styles.title}>Select Character</Text>

                <View style={styles.listWrapper}>
                    <FlatList
                        data={chars}
                        renderItem={renderCharacter}
                        keyExtractor={(item) => item.id}
                        numColumns={6}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.grid}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                </View>

                <ScrollView style={styles.detailsContainer} contentContainerStyle={{alignItems: 'center'}}>
                    <Text style={styles.subtitle}>{chars[currentCharacter].name}</Text>
                    <Text style={styles.text}>{chars[currentCharacter].desc}</Text>
                </ScrollView>
            </View>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
        </ImageBackground>
    );
}

export default CharactersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.overlay,
    },

    listWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    detailsContainer: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'flex-start',
        textAlign: 'center',
    },

    title: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.title,
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },

    subtitle: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.header,
        marginBottom: 5,
        color: 'white',
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.medium,
        marginHorizontal: 200,
        color: 'white',
        lineHeight: FONT_SIZES.medium * 1.5,
    },

    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },

    grid: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    row: {
        justifyContent: 'center',
    },
});