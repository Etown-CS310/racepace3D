import { StyleSheet, Text, View, ImageBackground,ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { getSinglePerson } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';
import TextButton from '../../components/textButton';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function TeamScreen({ navigation, route }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const [members, setMembers] = useState(route.params.team.members);
    
        // useEffect(() => {
        //     async function fetchMembers() {
        //         setMembers(await members.map( async (member)=>{
        //             const memberData = await getSinglePerson(member);
        //             return memberData.username;
        //         }));
        //     }
        //     fetchMembers();
        // }, []);

    //console.log(route.params.team);
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>{route.params.team.name}</Text>
                <View style={styles.scrollWrapper}>
                    <ScrollView 
                        style={styles.scrollContainer}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Text style={styles.text}>Description: {route.params.team.description}</Text>
                        <Text style={styles.text}>Members:</Text>
                        {members.map((member,index) =>{
                            return (
                                <Text key={index} style={styles.text}>- {member} {route.params.team.members[index]===route.params.team.captain ? "★" : ""}</Text>
                            );
                        })}
                        <View style={styles.textButton}>
                            {/* TODO: implement join/leave logic with logged user */}
                            <TextButton title="Join Team" onPress={null} />
                        </View>
                    </ScrollView>
                </View>
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
        justifyContent: 'flex-start',
        alignItems: 'center',    
        padding: 40,
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

    scrollWrapper: {
        maxHeight: '80%',
        width: '80%',
    },

    scrollContainer: {
        borderRadius: 6,
        backgroundColor: COLORS.wrapper,
    },

    scrollContent: {
        padding: 20,
    },

    text: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.medium,
        marginBottom: 10,
    },

    textButton: {
        marginTop: 20,
        alignSelf: 'center',
        width: '50%',
    },
});