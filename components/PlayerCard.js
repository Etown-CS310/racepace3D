import {View,Text,StyleSheet} from 'react-native';




function PlayerCard({user,children}){
    //console.log(user);
    return(
        <View style={styles.card}>
            <Text>{user.username}</Text>
            <Text>highScore: {user.highScore}</Text>
            <Text>Friend Status: {user.status}</Text>
            {children}
        </View>
    );
}

export default PlayerCard;

const styles=StyleSheet.create({
    card:
    {

    }
});