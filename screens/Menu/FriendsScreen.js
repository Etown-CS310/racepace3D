import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { getFriends } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function FriendsScreen({ navigation }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        async function fetchFriends() {
            const friendsData = await getFriends();
            console.log(friendsData);
            setFriends(friendsData);
        }
        fetchFriends();
        
    },[]);
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Friends Screen</Text>
            </View>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
        </ImageBackground>
    );
}

export default FriendsScreen;

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
});