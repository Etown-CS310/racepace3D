import React from 'react';
import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/mountainBarrier.png';
import background from '../../assets/levelbackgrounds/Mountain_lvl_bg.png';
import floor from '../../assets/levelfloor/mountainGround.png';

export default function Track({ playerCharacter, onNext, onExit }) {
  return (
    <View style={{ flex: 1 }}>
      <BaseGame
        background={background}
        playerGiF={playerCharacter}
        barrierImg={barrier}
        floorImg={floor}
        onNext={onNext}
        onExit={onExit}
      />
    </View>

  );

}