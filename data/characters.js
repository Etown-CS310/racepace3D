import Cole from '../assets/characters/Cole3D.gif';
import Eliud from '../assets/characters/Eliud3D.gif';
import Grant from '../assets/characters/Grant3D.gif';
import Jakob from '../assets/characters/Jakob3D.gif';
import Mo from '../assets/characters/Mo3D.gif';
import Falk from '../assets/characters/Falk3D.gif';
import { getCharacters } from '../components/dbConnecter';


/*export const chars = 
[
  {
    id: 'cole',
    name: 'Cole Hocker',
    desc: 'Cole Hocker is an American middle-distance runner. He won the bronze medal in the 1500 meters at the 2022 World Athletics Championships.',
    img: Cole,
    unlocked: true,
  },
  {
    id: 'eliud',
    name: 'Eliud Kipchoge',
    desc: 'Eliud Kipchoge is a Kenyan long-distance runner who competes in marathons. He is the current world record holder, having run the marathon in 2:01:39 at the 2018 Berlin Marathon.',
    img: Eliud,
    unlocked: true,
  },
  {
    id: 'grant',
    name: 'Grant Fisher',
    desc: 'Grant Fisher is an American middle-distance runner. He won the silver medal in the 5000 meters at the 2022 World Athletics Championships.',
    img: Grant,
    unlocked: true,
  },
  {
    id: 'jakob',
    name: 'Jakob Ingebrigtsen',
    desc: 'Jakob Ingebrigtsen is a Norwegian middle-distance runner. He is the current Olympic champion in the 1500 meters and the 5000 meters.',
    img: Jakob,
    unlocked: true,
  },
  {
    id: 'mo',
    name: 'Mo Farah',
    desc: 'Mo Farah is a British long-distance runner. He is a four-time Olympic champion and a six-time world champion.',
    img: Mo,
    unlocked: true,
  },
  {
    id: 'falk',
    name: 'Brian Falk',
    desc: 'Brian Falk is a Division III Cross Country and Track coach at Elizabetown College in Pennsylvania. He always encourages his athletes that "wherever you are, it gets better from here".',
    img: Falk,
    unlocked: false,
  },
];*/

export async function getChars()
{
  let chars = await getCharacters();
  //console.log(chars);
  chars=chars.map((char)=>
    {
      char.unlocked= char.id === 'falk' ? false : true;
      switch(char.id)
      {
        case 'cole':
          char.img= Cole;
          break;
        case 'eliud':
          char.img= Eliud;
          break;
        case 'grant':
          char.img= Grant;
          break;
        case 'jakob':
          char.img= Jakob;
          break;
        case 'mo':
          char.img= Mo;
          break;
        case 'falk':
          char.img= Falk;
          break;
        default:
          char.img= Cole;
      }
      //console.log(char);
      return char;
    });
  //console.log(chars);
  return chars;
}