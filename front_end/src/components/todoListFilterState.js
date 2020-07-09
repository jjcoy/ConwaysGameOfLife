// standard imports
import { atom } from 'recoil'; // Recoil is a state management library

// this is an atom, that stores state across components (that are housed in a RecoilRoot element
// This one happens to be the current selection from a dropdown box in the UI
const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

export default todoListFilterState;
