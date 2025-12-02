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
                            <Text style={styles.text}>High Score: {user.score.highScore}</Text>
                    )}
                </View>
                <Image
                                source={source}
                                style={styles.charImage}
                                resizeMode="contain"
                            />
                <NavigationPressable source={ViewFriend} onPress={onPressHandler} size={45} style={LAYOUT.button} />
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
        height: 100,
        margin: 5,
    },

    selectedContainer: {
        height: 'auto',
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },

    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flex: 1,
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
        fontSize: FONT_SIZES.medium,
        margin: 5,
    },
    
    charImage: {
        width: 30,
        alignSelf: 'center',
    },
});