import { StyleSheet, Text, View, ImageBackground, FlatList, Alert, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { getFriends, requestFriendship, AuthContext, acceptFriendship, denyFriendship, removeFriend } from '../../components/dbConnecter';

import PlayerCard from '../../components/PlayerCard';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/light/LeftArrow.png';
import plusimg from '../../assets/buttons/dark/New.png';

import NavigationPressable from '../../components/NavigationPressable';
import Input from '../../components/input';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function FriendsScreen({ navigation }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const [friends, setFriends] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function fetchFriends() {
            const friendsData = await getFriends();
            setFriends(friendsData);
        }
        fetchFriends();
    },[refresh]);

    const [friendUID, setFriendUID] = useState('');

    async function addFriendHandler() {
        const successfull=await requestFriendship(friendUID);
        
        if(successfull===0)
            Alert.alert('Add Friend','Friend request sent!');
        else if(successfull===1 || successfull===2)
            Alert.alert('Add Friend','Friend not found, check your uid');
        else
            Alert.alert('Add Friend','Already friends or request pending');

        setRefresh(!refresh);
    }

    async function acceptFriendHandler() {
        const response=await acceptFriendship(this.fuid);

        if(response===0)
            Alert.alert('Friendship Accepted','You are now friends!');
        else
            Alert.alert('Error','error, try again later');

        menuHandler();
    }

    async function denyFriendHandler() {
        const response=await denyFriendship(this.fuid);
        Alert.alert('Friendship Denied','User has been removed from the list.');

        menuHandler();
    }

    async function removeFriendHandler() {
        const response=await removeFriend(this.fuid);

        if(response===0)
            Alert.alert('Friend Removed','You are no longer friends.');
        else
            Alert.alert('Error','Database error, try again later');
        
        menuHandler();
    }

    function vpHandler() {
        
    }

    function renderFriend({ item }) {
        return (
            <PlayerCard key={item.uid} user={item} viewPlayerHandler={vpHandler}>
                {item.status === 'pending' ? (
                    <Button title="Accept" onPress={acceptFriendHandler.bind({"fuid":item.uid})}></Button>
                ) : null}
                {item.status === 'pending' || item.status === 'requested' ? (
                    <Button title="Deny" onPress={denyFriendHandler.bind({"fuid":item.uid})}></Button>
                ) : (
                    <Button
                        title="Remove Friend"
                        onPress={()=>{
                            Alert.alert("Confirm","Are you sure you want to do that?", [
                                {'text': 'OK', onPress: ()=>{ removeFriendHandler.bind({ "fuid":item.uid })() }},
                                {'text': 'Cancel', style: 'cancel'}
                        ])}}
                    ></Button>
                )}
            </PlayerCard>
        );
    }
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Friends Screen</Text>
                <View style={styles.addFriend}>
                    <View style={styles.input}>
                        <Input title="Add Friend by UID" value={friendUID} onChangeText={setFriendUID} />
                        <Text style={styles.text}>MyUID: {AuthContext.uid}</Text>
                    </View>
                    <NavigationPressable onPress={addFriendHandler} source={plusimg} size={40}/>
                </View>
                <FlatList
                    data={friends}
                    renderItem={renderFriend}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                />
                <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
            </View>
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

    addFriend: {
        alignContent: 'center',
        textAlign: 'left',
        margin: 10,
        flexDirection: 'row',
        gap: 10,
    },
    
    input: {
        width: '50%',
        gap: 10,
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.small,
        color:'white',
    },
});