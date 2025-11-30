import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useCallback } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from 'expo-font';
import { useState } from 'react';

// Importing The Screens
import GameScreen from './screens/GameScreen';
import MenuScreen from './screens/MenuScreen';
import CharactersScreen from './screens/Menu/CharactersScreen';
import HighscoresScreen from './screens/Menu/HighscoresScreen';
import FriendsScreen from './screens/Menu/FriendsScreen';
import TeamScreen from './screens/Menu/TeamScreen';
import Login from './screens/UserFuncts/Login';
import Register from './screens/UserFuncts/Register';
import TeamDetailsScreen from './screens/Menu/TeamDetailsScreen';
import NewTeamScreen from './screens/Menu/NewTeamScreen';
import EditTeamScreen from './screens/Menu/EditTeamScreen';

import { getChars } from './data/characters';
import { getMe,updateCharacter } from './components/dbConnecter.js';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [chars, setChars] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(0);

  const [fontsLoaded] = useFonts({
    PressStart2P: require('./assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    async function fetchChars() {
      const fetchedChars = await getChars();
      setChars(fetchedChars);
    }
    async function getCurrentChar()
    {
      const me = await getMe();
      setCurrentCharacter(me.char.id);
      //console.log(me);
    }
    fetchChars();
    getCurrentChar();
  }, []);



  // Hide Android navigation bar
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("immersive");
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Don't render app until fonts loaded
  if (!fontsLoaded) {
    return null;
  }

  const characterHandler = (index) => {
    setCurrentCharacter(index);
    updateCharacter(index);
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
          detachPreviousScreen: false,
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Game">
            {(props) => (
              <GameScreen
                {...props}
                currentCharacter={currentCharacter}
                chars={chars}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Characters">
            {(props) => (
              <CharactersScreen
                {...props}
                currentCharacter={currentCharacter}
                characterHandler={characterHandler}
                chars={chars}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Highscores" component={HighscoresScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="Team" component={TeamScreen} />
          <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} />
          <Stack.Screen name="NewTeam" component={NewTeamScreen} />
          <Stack.Screen name="EditTeam" component={EditTeamScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});