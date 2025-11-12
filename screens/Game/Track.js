import { View } from 'react-native';
import BaseGame from './BaseGame';
import barrier from '../../assets/barriers/hurdle_1.png';
import background from '../../assets/levelbackgrounds/Track_lvl_bg.png';
import floor from '../../assets/levelfloor/trackGround.png';
import trackbg from '../../assets/images/Trackbg.png';


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
        gameEndBackground={trackbg}
        freePlay={freePlay}
      />
    </View>

  );

}

