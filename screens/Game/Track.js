import React from 'react';
import BaseGame from './BaseGame';
import trackbg from '../../assets/images/Trackbg.png';
import player from  '../../assets/characters/cole.gif';
import barrier from '../../assets/barriers/hurdle_1.png';

export default function Track() {
  return (
    <View style={styles.container}>
      <BaseGame
        background={trackbg}
        playerGiF={player}
        barrierImg={barrier}
        floorColor='red'
      />
    </View>
  );
}

