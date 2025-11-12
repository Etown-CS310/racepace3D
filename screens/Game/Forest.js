import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/forestBarrier.png';
import background from '../../assets/levelbackgrounds/Forest_lvl_bg.png';
import floor from '../../assets/levelfloor/forestGround.png';
import forestbg from '../../assets/images/Forestbg.png';


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
        gameEndBackground={forestbg}
        freePlay={freePlay}
      />
    </View>

  );

}