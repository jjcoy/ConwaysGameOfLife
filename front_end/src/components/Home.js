// front_end/src/components/Home.js

// standard imports
import React from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
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

  // start the game running
  const go = () => setRunning(true);

  // pause the game
  const stop = () => setRunning(false);

  // step the game through one tick
  const step = () => {
    setTick(tick + 1);

    // for each cell, check to see if it will live or die
    // We are making a new 2D array, since we are changing many cells, and don't want to
    // rerender after each individual cell is changed
    let newGenGameCells = Array(gameCols)
      .fill()
      .map(() => Array(gameRows).fill(false));
    // cycle through gameCells (last generation) and determine new generation
    for (let row = 0; row < gameRows; row++) {
      // this is y
      for (let col = 0; col < gameCols; col++) {
        // this is x
        newGenGameCells[row][col] = {
          x: row,
          y: col,
          live: willCellLive(col, row),
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
    for (let x = 0; x < gameCols; x++) {
      // x goes across the columns
      cells[x] = []; // make this an array
      for (let y = 0; y < gameRows; y++) {
        // y goes down the rows
        cells[x][y] = { x: x, y: y, live: trueOrFalse(0.25) };
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
  const willCellLive = (thisx, thisy) => {
    // calculate the positions surrounding this cell (the board wraps around the edges)
    // (0,0) is top left corner, x positive to the right, y positive going down
    const west = mod(thisx - 1, gameCols); // javascript % does not work for negatives
    const east = (thisx + 1) % gameCols;
    const north = mod(thisy - 1, gameRows);
    const south = (thisy + 1) % gameRows;

    // check contents of each of the 8 surrounding cells, if one is live, add to total
    let numLive = 0;
    // check directly left/right/up/down cells
    if (gameCells[west][thisy].live) {
      numLive++;
    }
    if (gameCells[east][thisy].live) {
      numLive++;
    }
    if (gameCells[thisx][north].live) {
      numLive++;
    }
    if (gameCells[thisx][south].live) {
      numLive++;
    }
    // check diagionals
    if (gameCells[west][north].live) {
      numLive++;
    }
    if (gameCells[east][north].live) {
      numLive++;
    }
    if (gameCells[west][south].live) {
      numLive++;
    }
    if (gameCells[east][south].live) {
      numLive++;
    }

    // depending on the number of live cells surrounding this one, determine if this
    // cell will live to the next generation
    if (numLive === 3) {
      return true;
    } else if (numLive === 2 && gameCells[(thisx, thisy)].live) {
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
