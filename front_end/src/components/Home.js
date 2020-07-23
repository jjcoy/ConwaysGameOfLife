// front_end/src/components/Home.js

// standard imports
import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import './Home.css';

// import components
import GameBoard from './GameBoard';

// import the atoms that represent the game
import * as gameState from '../gameState';

const Home = () => {
  // gather state information from the Recoil gameState
  const gameRows = useRecoilValue(gameState.rows);
  const gameCols = useRecoilValue(gameState.cols);
  const [gameCells, setGameCells] = useRecoilState(gameState.cellLife);
  const numLiveCells = useRecoilValue(gameState.numLiveCells);
  const gameSpeed = useRecoilValue(gameState.gameSpeed);
  const [tick, setTick] = useRecoilState(gameState.gameTick);
  const [running, setRunning] = useRecoilState(gameState.gameRunning);

  // start the game running, stop when there are no live cells, report number of generations
  const go = () => setRunning(true);

  // pause the game
  const stop = () => setRunning(false);

  // step the game through one tick
  const step = () => {
    setTick(tick + 1);

    // for each cell, check to see if it will live or die
    // We are making a new 2D array, since we are changing many cells, and don't want to
    // rerender after each individual cell is changed
    let newGenGameCells = Array(gameRows)
      .fill()
      .map(() => Array(gameCols).fill(false));
    // cycle through gameCells (last generation) and determine new generation
    for (let row = 0; row < gameRows; row++) {
      // this is down the rows
      for (let col = 0; col < gameCols; col++) {
        // this is across the cols
        newGenGameCells[row][col] = {
          row: row,
          col: col,
          live: willCellLive(row, col),
        };
      }
    }

    // save new game state
    setGameCells(newGenGameCells);
  };

  // function to get true or false,
  // level=0.50 would have 50% live and level=0.25 would have 25% live
  const trueOrFalse = (level) => {
    return Math.random() < level;
  };

  // function to reset all cellLifes to being dead (false), and a few random ones true
  const resetGame = () => {
    // reset the game counter
    setTick(0);

    // reset the cell contents
    let cells = []; // cells will be a 2D array of booleans

    // build and set the cells to false, using rows and cols from the gameState to control the size
    for (let row = 0; row < gameRows; row++) {
      // x goes down the rows
      cells[row] = []; // make this an array
      for (let col = 0; col < gameCols; col++) {
        // y goes across the columns
        cells[row][col] = { row: row, col: col, live: trueOrFalse(0.25) };
      }
    }

    // return the newly built 2D array
    setGameCells(cells);
  };

  // because JavaScript % does not work like a normal mod operator, we
  // need a function to make it work right.
  // (in Javascript (value - 1) % limit will give a negative number,
  // preventing us from using it to wrap around the left side)
  // see: https://maurobringolf.ch/2017/12/a-neat-trick-to-compute-modulo-of-negative-numbers/
  const mod = (x, n) => ((x % n) + n) % n;

  // function to determine the status of this cell for the next generation
  // 1. Any live cell with two or three live neighbours survives.
  // 2. Any dead cell with three live neighbours becomes a live cell.
  // 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  const willCellLive = (thisRow, thisCol) => {
    // calculate the positions surrounding this cell (the board wraps around the edges)
    // (0,0) is top left corner, row positive going down, col positive to the right
    const west = mod(thisCol - 1, gameCols); // javascript % does not work for negatives
    const east = (thisCol + 1) % gameCols;
    const north = mod(thisRow - 1, gameRows);
    const south = (thisRow + 1) % gameRows;

    // check contents of each of the 8 surrounding cells, if one is live, add to total
    let numLive = 0;
    // check directly left/right/up/down cells
    if (gameCells[thisRow][west].live) {
      // left
      numLive++;
    }
    if (gameCells[thisRow][east].live) {
      // right
      numLive++;
    }
    if (gameCells[north][thisCol].live) {
      // up
      numLive++;
    }
    if (gameCells[south][thisCol].live) {
      // down
      numLive++;
    }
    // check diagionals
    if (gameCells[north][west].live) {
      // up left
      numLive++;
    }
    if (gameCells[north][east].live) {
      // up right
      numLive++;
    }
    if (gameCells[south][west].live) {
      // down left
      numLive++;
    }
    if (gameCells[south][east].live) {
      // down right
      numLive++;
    }

    // depending on the number of live cells surrounding this one, determine if this
    // cell will live to the next generation
    if (numLive === 3) {
      return true;
    } else if (numLive === 2 && gameCells[(thisCol, thisRow)].live) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="Home">
      {/* The title area above the gameboard */}
      <div className="Home-title">
        <div className="title-text">Conway's Game of Life</div>
        <div>
          For more information, visit the{' '}
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Wikipedia page
          </a>
        </div>
      </div>

      {/* The gameboard itself. */}
      <div className="Home-board">
        <GameBoard />
      </div>

      {/* The panel of controls, below the gameboard */}
      <div className="Home-controls">
        <div>Game Speed: {gameSpeed}</div>
        <div>
          Tick: {tick}{' '}
          {running ? (
            <div>
              <button onClick={stop}>Pause</button>
            </div>
          ) : (
            <div>
              <button onClick={step}>Step</button>{' '}
              <button onClick={go}>Run</button>
            </div>
          )}
        </div>
        <div>
          Number of Live Cells: {numLiveCells}{' '}
          <div>
            <button onClick={resetGame}>Reset cells</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
