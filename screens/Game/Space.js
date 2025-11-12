import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/spaceBarrier.png';
import background from '../../assets/levelbackgrounds/Space_lvl_bg.png';
import floor from '../../assets/levelfloor/spaceGround.png';
import spacebg from '../../assets/images/Spacebg.png';


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
        gameEndBackground={spacebg}
        freePlay={freePlay}
      />
    </View>

  );

}