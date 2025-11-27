import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext, getTeams, getMe } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/LeftArrow.png';
import newimg from '../../assets/buttons/New.png';

import TeamButton from '../../components/TeamButton';
import NavigationPressable from '../../components/NavigationPressable';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

function TeamScreen({ navigation }) {
    const [teams, setTeams] = useState([]);
    const [me, setMe] = useState(null);

    const menuHandler = () => {
        navigation.goBack();
    };

    useEffect(() => {
        async function fetchTeams() {
            const teamObjects = await getTeams();
            const teamArray = teamObjects ? Object.values(teamObjects) : [];
            setTeams(teamArray);
        }
        fetchTeams();
    }, []);

    useFocusEffect(
        useCallback(() => {
            async function pageRefresh() {
                const teamObjects = await getTeams();
                const teamArray = teamObjects ? Object.values(teamObjects) : [];
                setTeams(teamArray);
                const meData = await getMe();
                setMe(meData);
            }
            pageRefresh();
        }, [])
    );

    useEffect(() => {
        async function fetchMe() {
            const meData = await getMe();
            setMe(meData);
        }
        fetchMe();
    }, []);

    function teamPressHandler(team) {
        navigation.navigate('TeamDetails', { team: team, uid: AuthContext.uid });
    }

    const newTeamHandler = () => {
        navigation.navigate('NewTeam');
    };

    function renderTeam({ item }) {
        return (
            <TeamButton
                name={item.name}
                memberCount={item.members.length}
                onPress={() => teamPressHandler(item)}
            />
        );
    }
    
    return (
        <ImageBackground
            source={ menuBg }
            style={styles.bgImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Teams</Text>
                <FlatList
                    data={teams}
                    renderItem={renderTeam}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                />
            </View>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
            {me?.teamID === -1 &&
                <NavigationPressable style={styles.newButton} onPress={newTeamHandler} source={newimg} />
            }
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

    newButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});