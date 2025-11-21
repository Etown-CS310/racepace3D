import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

import { getTeams } from '../../components/dbConnecter';

import menuBg from '../../assets/images/title.png';
import backimg from '../../assets/buttons/LeftArrow.png';
import newimg from '../../assets/buttons/New.png';

import TeamButton from '../../components/TeamButton';
import NavigationPressable from '../../components/NavigationPressable';

import { COLORS, FONT_SIZES, LAYOUT } from '../../constants';

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


    function teamPressHandler() {
        //console.log(this.selTeam);
        navigation.navigate('TeamDetailsScreen', { team: this.selTeam });
    }

    function renderTeam({ item }) {
        return (
            <TeamButton
                name={item.name}
                memberCount={item.members.length}
                onPress={teamPressHandler.bind({ selTeam: item })}
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
                    keyExtractor={(item) => item.captain}
                    numColumns={2}
                    // columnWrapperStyle={styles.row}
                    // contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                />
            </View>
            <NavigationPressable style={LAYOUT.backButton} onPress={menuHandler} source={backimg} />
            {/* TODO: Create a new team */}
            <NavigationPressable style={styles.newButton} onPress={null} source={newimg} />
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

    grid: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    row: {
        justifyContent: 'center',
    },
});