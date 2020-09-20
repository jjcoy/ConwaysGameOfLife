// standard imports
import { atom, selector } from 'recoil'; // Recoil is a state management library

///////
// these are atoms, which store state across components
// (that are housed in a RecoilRoot element)
///////

// the time counter for the game
export const gameTick = atom({ key: 'gameTick', default: 0 });

// is the game running?
export const gameRunning = atom({ key: 'gameRunning', default: false });

// game speed, in milliseconds
export const gameSpeed = atom({ key: 'gameSpeed', default: 500 });

// the number of rows in the game board
export const rows = atom({ key: 'rows', default: 20 });

// the number of columns in the game board
export const cols = atom({ key: 'cols', default: 30 });

// the number of pixels per cell
export const cellSize = atom({ key: 'cellSize', default: 20 });

// the state of all the cells, a 2D array of boolean
// NOTE:  this array is initialized in the Home.js file
export const cellLife = atom({ key: 'cellLife', default: [] });

///////
// these are selectors, which return values derived from atoms
///////

// get the width of the game board, in pixels
export const width = selector({
  key: 'width',
  get: ({ get }) => get(cols) * get(cellSize),
});

// get the height of the game board, in pixels
export const height = selector({
  key: 'height',
  get: ({ get }) => get(rows) * get(cellSize),
});

// get a list of live cells, with x and y components
export const liveCells = selector({
  key: 'liveCells',
  get: ({ get }) => {
    // first, we need to flatten the 2D array, into one array of objects, of the form:
    // [ ... {x: 29, y: 15, live: true}, {x: 29, y:16, live: false} ... ]
    const allCells = [].concat.apply([], get(cellLife)); // all cells

    // just use the ones that are alive
    return allCells.filter((item) => item.live);
  },
});

// get the total number of live cells on the game board
export const numLiveCells = selector({
  key: 'numLiveCells',
  get: ({ get }) => {
    return [].concat.apply([], get(cellLife)).filter((item) => item.live)
      .length;
  },
});
