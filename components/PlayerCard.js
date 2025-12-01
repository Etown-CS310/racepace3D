import {View,Text,StyleSheet} from 'react-native';
import { COLORS, FONT_SIZES, LAYOUT } from '../constants';
import NavigationPressable from './NavigationPressable';
import ViewFriend from '../assets/buttons/View.png';



function PlayerCard({user,children,viewPlayerHandler}){
    //console.log(user);
    return(
        <View style={styles.card}>
            <Text>{user.username}</Text>
            <Text>highScore: {user.highScore}</Text>
            {children}
            <NavigationPressable source={ViewFriend} size={30} onPress={viewPlayerHandler}/>
        </View>
    );
}

export default PlayerCard;

const styles=StyleSheet.create({
    card:
    {
        backgroundColor:COLORS.wrapper,
        padding:10,
        margin:10,
        borderRadius:10,
        width:150,
        alignItems:'center',

    }
});