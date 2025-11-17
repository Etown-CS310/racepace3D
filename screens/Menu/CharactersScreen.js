import { StyleSheet, View, Text, Button, Pressable, ImageBackground, FlatList } from 'react-native';
import { useState } from 'react';
import { ScrollView } from 'react-native';

import menuBg from '../../assets/images/MenuImage.png';

import backimg from '../../assets/buttons/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';
import CharacterPressable from '../../components/CharacterPressable';

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

                <View style={styles.detailsContainer}>
                        <Text style={styles.subtitle}>{chars[currentCharacter].name}</Text>
                    <ScrollView>
                        <Text style={styles.text}>{chars[currentCharacter].desc}</Text>
                    </ScrollView>
                </View>
            </View>
            <NavigationPressable style={{alignSelf: 'flex-start'}} onPress={menuHandler} source={backimg} />
        </ImageBackground>
    );
}

export default CharactersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        height: '100%',
        width: '100%',
    },

    listWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    detailsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },

    title: {
        fontFamily: 'PressStart2P',
        fontSize: 25,
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },

    subtitle: {
        fontFamily: 'PressStart2P',
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: 12,
        marginHorizontal: 200,
        color: 'white',
        lineHeight: 18,
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