import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

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

import { getChars } from './data/characters';

const Stack = createNativeStackNavigator();



export default function App() {
  const [chars, setChars] = useState([]);

  useEffect(() => 
    {
    async function fetchChars() 
    {
      const fetchedChars = await getChars();
      setChars(fetchedChars);
    }
    fetchChars();
    //console.log(chars);
  },[]);

  const [fontsLoaded] = useFonts({
    PressStart2P: require('./assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Hide Android navigation bar
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("immersive");
  }, []);

  const [currentCharacter, setCurrentCharacter] = useState(0);

  const characterHandler = (index) => {
    setCurrentCharacter(index);
  };

    return (
      <>
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
      </Stack.Navigator>
    </NavigationContainer>
    </>
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
