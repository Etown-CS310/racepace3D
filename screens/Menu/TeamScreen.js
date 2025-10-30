import { StyleSheet, Text, View, ImageBackground,ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

import { getTeams } from '../../components/dbConnecter';

import menuBg from '../../assets/images/MenuImage.png';

import backimg from '../../assets/buttons/LeftArrow.png';

import NavigationPressable from '../../components/NavigationPressable';

function TeamScreen({ navigation }) {
    const menuHandler = () => {
        navigation.goBack();
    };

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function fetchTeams() {
            const fetchedTeams = await getTeams();
            setTeams(fetchedTeams);
        }
        fetchTeams();
    }, []);
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Team Screen</Text>
                <ScrollView style={styles.scrollContainer}>
                {   teams.map((team,index) =>{
                        return (
                            <View key={index}>
                                <Text style={styles.text}>{team.name}</Text>
                                <Text style={styles.text}>{team.description}</Text>
                                <Text style={styles.text}>{team.captain}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <NavigationPressable style={{alignSelf: 'flex-start'}} onPress={menuHandler} source={backimg} />
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
        backgroundColor: 'rgba(190, 190, 190, 0.7);',
        width: 350,
        textAlign: 'center',
        //alignItems: 'center',
        borderRadius: 10,
        padding: 20,
    },
    text:
    {
        color:'white',
        fontWeight:500,
    },
});