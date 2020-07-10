// standard imports
import { atom } from 'recoil'; // Recoil is a state management library

// this is an atom, that stores state across components
// (that are housed in a RecoilRoot element)

const gameTick = atom({ key: 'gameTick', default: 0 });

const xdim = atom({ key: 'gameXdim', default: 800 });

export default gameTick;
