// standard imports
import { atom, selector } from 'recoil'; // Recoil is a state management library

///////
// these are atoms, which store state across components
// (that are housed in a RecoilRoot element)
///////

// the time counter for the game
export const gameTick = atom({ key: 'gameTick', default: 0 });

// the number of rows in the game board
export const rows = atom({ key: 'rows', default: 20 });

// the number of columns in the game board
export const cols = atom({ key: 'cols', default: 30 });

// the number of pixels per cell
export const cellSize = atom({ key: 'cellSize', default: 20 });

///////
// these are selectors, which return values derived from atoms
///////

// the width of the game board, in pixels
export const width = selector({
  key: 'width',
  get: ({ get }) => get(cols) * get(cellSize),
});

// the height of the game board, in pixels
export const height = selector({
  key: 'height',
  get: ({ get }) => get(rows) * get(cellSize),
});
