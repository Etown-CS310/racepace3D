import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/desertBarrier.png';
import background from '../../assets/levelbackgrounds/Desert_lvl_bg.png';
import floor from '../../assets/levelfloor/desertGround.png';
import desertbg from '../../assets/images/Desertbg.png';


export default function Track({ playerCharacter, onNext, onExit, freePlay }) {
  return (
    <View style={{ flex: 1 }}>
      <BaseGame
        background={background}
        playerGiF={playerCharacter}
        barrierImg={barrier}
        floorImg={floor}
        gameEndBackground={desertbg}
        freePlay={freePlay}
        onNext={onNext}
        onExit={onExit}
      />
    </View>

  );

}