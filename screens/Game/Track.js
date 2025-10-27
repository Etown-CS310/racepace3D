import React from 'react';
import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/hurdle_1.png';

export default function Track({ background, playerCharacter, onComplete, onFail }) {
  return (
    <View style={{ flex: 1 }}>
      <BaseGame
        background={background}
        playerGiF={playerCharacter}
        barrierImg={barrier}
        floorColor='black'
      />
    </View>

  );

}

