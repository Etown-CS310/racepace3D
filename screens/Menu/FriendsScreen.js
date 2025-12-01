import { StyleSheet, Text, View, ImageBackground,ScrollView,Alert,Button } from 'react-native';
import { useEffect, useState } from 'react';
import { getFriends,requestFriendship,AuthContext,acceptFriendship,denyFriendship,removeFriend } from '../../components/dbConnecter';

import PlayerCard from '../../components/PlayerCard';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/light/LeftArrow.png';
import plusimg from '../../assets/buttons/dark/New.png';

import NavigationPressable from '../../components/NavigationPressable';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';
import Input from '../../components/input';

function FriendsScreen({ navigation }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const [friends, setFriends] = useState([]);
    const [refresh,setRefresh]=useState(false);

    useEffect(() => {
        async function fetchFriends() {
            const friendsData = await getFriends();
            //console.log(friendsData);
            setFriends(friendsData);
        }
        fetchFriends();
    },[refresh]);

    const [friendUID, setFriendUID] = useState('');

    async function addFriendHandler()
    {
        const successfull=await requestFriendship(friendUID);
        
        if(successfull===0)
            Alert.alert('Add Friend','Friend request sent!');
        else if(successfull===1 || successfull===2)
            Alert.alert('Add Friend','Friend not found, check your uid');
        else
            Alert.alert('Add Friend','Already friends or request pending');

        setRefresh(!refresh);
    }

    async function acceptFriendHandler()
    {
        //console.log(this.fuid);
        const response=await acceptFriendship(this.fuid);

        if(response===0)
            Alert.alert('Friendship Accepted','You are now friends!');
        else
            Alert.alert('Error','error, try again later');

        menuHandler();
        
    }
    async function denyFriendHandler()
    {
        //console.log(this.fuid);
        const response=await denyFriendship(this.fuid);

        //if(response===0)
            Alert.alert('Friendship Denied','User has been removed from the list.');
        //else
        //    Alert.alert('Error','error, try again later');

        menuHandler();

    }
    async function removeFriendHandler()
    {
        //console.log(this.fuid);
        const response=await removeFriend(this.fuid);

        if(response===0)
            Alert.alert('Friend Removed','You are no longer friends.');
        else
            Alert.alert('Error','Database error, try again later');
        
        menuHandler();
    }

    function vpHandler()
    {
        
    }
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.addFriend}>
                    
                    <View style={styles.input}>
                        <Input title="add Friend by uid" value={friendUID} onChangeText={setFriendUID} />
                        <Text style={styles.text}>MyUid {AuthContext.uid}</Text>
                    </View>
                    <NavigationPressable style={{alignSelf: 'flex-start'}} onPress={addFriendHandler} source={plusimg} />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Friends Screen</Text>
                
            </View>
            <ScrollView>
            {friends.map((friend) => (
                <View key={friend.username}>
                    <PlayerCard user={friend} viewPlayerHandler={vpHandler}>
                        {friend.status==='pending'?<Button title="Accept" onPress={acceptFriendHandler.bind({"fuid":friend.uid})}></Button>:""}
                        {friend.status==='pending'||friend.status==='requested'?<Button title="Deny" onPress={denyFriendHandler.bind({"fuid":friend.uid})}></Button>:<Button title="Remove Friend" onPress={()=>{
                            Alert.alert("Confirm","Are you sure you want to do that?",[
                            {'text':'OK',onPress:()=>{removeFriendHandler.bind({"fuid":friend.uid})()}},
                            {'text':'Cancel',style:'cancel'}
                            ])}}></Button>}
                    </PlayerCard>
                </View>
                ))}
            </ScrollView>
            <NavigationPressable style={{alignSelf: 'flex-start'}} onPress={menuHandler} source={backimg} />
        </ImageBackground>
    );
}

export default FriendsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
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
    addFriend:
    {
        alignContent:'right',
        textAlign:'right',
        alignSelf:'flex-end',
        margin:10,
        flexDirection:'row',
    },
    input:
    {
        width:150,
        marginRight:10,
    },
    text:
    {
        color:'white',
        fontWeight:'700',
    },
});