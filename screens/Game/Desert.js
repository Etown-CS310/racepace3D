import React from 'react';
import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/desertBarrier.png';
import background from '../../assets/levelbackgrounds/Desert_lvl_bg.png';
import floor from '../../assets/levelfloor/desertGround.png';

export default function Track({ playerCharacter, onComplete, onFail }) {
  return (
    <View style={{ flex: 1 }}>
      <BaseGame
        background={background}
        playerGiF={playerCharacter}
        barrierImg={barrier}
        floorImg={floor}
        onComplete={onComplete}
        onFail={onFail}
      />
    </View>

  );

}