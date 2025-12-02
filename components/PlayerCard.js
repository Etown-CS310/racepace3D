import { useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { COLORS, FONT_SIZES, LAYOUT } from '../constants';
import NavigationPressable from './NavigationPressable';
import ViewFriend from '../assets/buttons/dark/View.png';

function PlayerCard({ user, children, source }){
    const [selected, setSelected] = useState(false);

    const onPressHandler = () => {
        setSelected(!selected);
    }

    return (
        <View style={[styles.container, selected && styles.selectedContainer]}>
            <View style={styles.topRow}>
                <View style={styles.textContainer}>
                    <Text style={styles.name} numberOfLines={selected ? 2 : 1}>{user.username}</Text>
                    {(user.status === 'pending') || (user.status === 'requested') ? (
                        <Text style={styles.text}>(Pending)</Text>
                    ) : (
                        <Text style={styles.text}>High Score: {user.highScore}</Text>
                    )}
                </View>
                <View style={styles.imageWrapper}>
                    <Image
                        source={source}
                        style={styles.charImage}
                        resizeMode="contain"
                    />
                </View>
                <NavigationPressable source={ViewFriend} onPress={onPressHandler} size={45} style={LAYOUT.viewButton} />
            </View>
            {selected && (
                <View style={styles.buttonContainer}>
                    {children}
                </View>
            )}
        </View>
    );
}

export default PlayerCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: COLORS.wrapper,
        borderRadius: 6,
        width: 300,
        height: 80,
        margin: 5,
    },

    selectedContainer: {
        height: 'auto',
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    textContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        flex: 1,
        paddingRight: 0,
    },

    buttonContainer: {
        width: '100%',
        paddingHorizontal: 10,
    },

    name: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.large,
        margin: 5,
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.small,
        margin: 5,
    },

    imageWrapper: {
        alignSelf: 'flex-start',
        paddingTop: 10,
    },

    charImage: {
        height: 60,
        alignSelf: 'flex-start',
    },
});