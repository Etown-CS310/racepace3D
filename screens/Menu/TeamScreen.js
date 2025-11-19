import { StyleSheet, Text, View, ImageBackground,ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

import { getTeams } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/LeftArrow.png';

import TeamButton from '../../components/TeamButton';
import NavigationPressable from '../../components/NavigationPressable';

import { LAYOUT } from '../../constants/layout';

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


    function teamPressHandler()
    {
        //console.log(this.selTeam);
        navigation.navigate('TeamDetailsScreen', { team: this.selTeam });
    }
    
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
                            <TeamButton key={index} name={team.name} memberCount={team.members.length} onPress={teamPressHandler.bind({ "selTeam":team})}/>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

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
        //borderWidth: '2',
        //backgroundColor: 'rgba(190, 190, 190, 0.7);',
        width: '90%',
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