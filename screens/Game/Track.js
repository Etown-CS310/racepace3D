import React from 'react';
import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/hurdle_1.png';
import background from '../../assets/levelbackgrounds/Track_lvl_bg.png';
import floor from '../../assets/levelfloor/trackGround.png';

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

