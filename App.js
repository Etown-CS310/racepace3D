import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import GameScreen from './screens/GameScreen';
import MenuScreen from './screens/MenuScreen';


export default function App() {
  const [screenName, setScreenName] = useState();

  const changeScreenHandler = (item) => {
    if (item === 'menu') {
      setScreenName('menu');
    } else if (item === 'game') {
      setScreenName('game');
    }
  }

  let screen = <MenuScreen onChangeScreen={changeScreenHandler}/>;

  if (screenName === 'menu') {
    screen = <MenuScreen onChangeScreen={changeScreenHandler}/>;
  } else if (screenName === 'game') {
    screen = <GameScreen onChangeScreen={changeScreenHandler}/>;
  }

  return (
    <View style={styles.container}>
      {screen}
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
