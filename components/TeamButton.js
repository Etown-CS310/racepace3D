import { Text, View, StyleSheet } from 'react-native';
import NavigationPressable from './NavigationPressable';
import ViewTeam from '../assets/buttons/dark/View.png';

import { COLORS, FONT_SIZES, LAYOUT } from '../constants';

function TeamButton({ name, onPress, memberCount=1 }) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.text}>Members: {memberCount}</Text>
            </View>
            <NavigationPressable source={ViewTeam} onPress={onPress} size={45} style={LAYOUT.viewButton} />
        </View>
    );
}

export default TeamButton;

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: COLORS.wrapper,
        borderRadius: 6,
        width: 300,
        height: 80,
        margin: 5,
    },

    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        flex: 1,
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
});