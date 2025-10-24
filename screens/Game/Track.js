import React from 'react';
import { View } from 'react-native';
import BaseGame from './BaseGame';
import trackbg from '../../assets/images/Trackbg.png';
import player from  '../../assets/characters/Cole3D.gif';
import barrier from '../../assets/barriers/hurdle_1.png';

export default function Track() {
  return (
    <View style={{ flex: 1 }}>
      <BaseGame
        background={trackbg}
        playerGiF={player}
        barrierImg={barrier}
        floorColor='black'
      />
    </View>

  );

}

