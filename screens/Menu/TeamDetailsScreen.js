import { StyleSheet, Text, View, ImageBackground,ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { getSinglePerson } from '../../components/dbConnecter';

import menuBg from '../../assets/images/MenuImage.png';
import backimg from '../../assets/buttons/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';

import { LAYOUT } from '../../constants/layout';

function TeamScreen({ navigation, route }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const [members, setMembers] = useState(route.params.team.members);
    
        useEffect(() => {
            async function fetchMembers() {
                setMembers(await members.map( async (member)=>{
                    const memberData = await getSinglePerson(member);
                    return memberData.username;
                }));
            }
            
            fetchMembers();
            
        }, []);

    //console.log(route.params.team);
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Team Screen</Text>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.text}>Team Name: {route.params.team.name}</Text>
                    <Text style={styles.text}>Description: {route.params.team.description}</Text>
                    <Text style={styles.text}>Members:</Text>
                    {members.map((member,index) =>{
                        return (
                            // if officers get implemented ☆
                            <Text key={index} style={styles.text}>- {member} {route.params.team.members[index]===route.params.team.captain ? "★" : ""}</Text>
                        );
                    })}
                </ScrollView>
            </View>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
        </ImageBackground>
    );
}


export default TeamScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',    
        paddingTop: 40,
    },

    title: {
        fontFamily: 'PressStart2P',
        fontSize: 25,
        marginBottom: 20,
        color: 'white',
    },

    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollContainer:
    {
        margin:'auto',
        width: '90%',
        textAlign: 'center',
        borderRadius: 10,
        padding: 20,
    },
    text:
    {
        color:'white',
        fontWeight:500,
    },
});