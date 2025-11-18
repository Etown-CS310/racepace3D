import {Text,View,StyleSheet} from 'react-native';
import NavigationPressable from './NavigationPressable';
import ViewTeam from '../assets/buttons/View.png';
import { LAYOUT } from '../constants/layout';


function TeamButton({name,onPress,memberCount=1}) {
    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>Members: {memberCount}</Text>
            <NavigationPressable source={ViewTeam} onPress={onPress} size={45} style={LAYOUT.button} />
        </View>
    );
}

export default TeamButton;

const styles=StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        margin:1,
        // border:'2px solid black',
        backgroundColor:'rgba(200,200,200,0.7)',
        borderRadius:6,
    },
});