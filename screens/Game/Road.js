import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/roadBarrier.png';
import background from '../../assets/levelbackgrounds/Road_lvl_bg.png';
import floor from '../../assets/levelfloor/roadGround.png';
import roadbg from '../../assets/images/Roadbg.png';


export default function Track({ playerCharacter, onNext, onExit, freePlay }) {
  return (
    <View style={{ flex: 1 }}>
      <BaseGame
        background={background}
        playerGiF={playerCharacter}
        barrierImg={barrier}
        floorImg={floor}
        onNext={onNext}
        onExit={onExit}
        gameEndBackground={roadbg}
        freePlay={freePlay}
      />
    </View>

  );

}