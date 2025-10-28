import React from 'react';
import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/hurdle_1.png';
import background from '../../assets/levelbackgrounds/Track_lvl_bg.png';

export default function Track({ playerCharacter, onComplete, onFail }) {
  return (
    <View style={{ flex: 1 }}>
      <BaseGame
        background={background}
        playerGiF={playerCharacter}
        barrierImg={barrier}
        floorColor='red'
      />
    </View>

  );

}

