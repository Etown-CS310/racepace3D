import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

import { useFonts } from 'expo-font';

// Importing The Screens
import GameScreen from './screens/GameScreen';
import MenuScreen from './screens/MenuScreen';
import CharactersScreen from './screens/Menu/CharactersScreen';
import HighscoresScreen from './screens/Menu/HighscoresScreen';
import FriendsScreen from './screens/Menu/FriendsScreen';
import TeamScreen from './screens/Menu/TeamScreen';
import Login from './screens/UserFuncts/Login';
import Register from './screens/UserFuncts/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require('./assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Hide Android navigation bar
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("immersive");
  }, []);


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
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Characters" component={CharactersScreen} />
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
