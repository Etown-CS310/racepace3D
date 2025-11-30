import { Text, View, StyleSheet } from 'react-native';
import NavigationPressable from './NavigationPressable';
import Delete from '../assets/buttons/dark/Delete.png';
import Deleting from '../assets/buttons/Deleting.png';

import { COLORS, FONT_SIZES, LAYOUT } from '../constants';

function MemberButton({ name, captain, onPress, isDeleting }) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
            </View>
            {!captain ?
                <NavigationPressable 
                    source={isDeleting ? Deleting : Delete} 
                    onPress={onPress} 
                    size={25} 
                    style={LAYOUT.smallButton} 
                />
            : null}
        </View>
    );
}

export default MemberButton;

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: COLORS.textInput,
        borderColor: 'white',
        borderWidth: 2,
        alignSelf: 'center',
        height: 36,
    },

    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,
        flex: 1,
    },

    name: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.medium,
        margin: 5,
    },
});