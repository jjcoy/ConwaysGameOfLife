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
  const setGameCells = useSetRecoilState(gameState.cellLife);
  const numLiveCells = useRecoilValue(gameState.numLiveCells);

  // game clock (tick)
  const gameSpeed = useRecoilValue(gameState.gameSpeed);
  const [tick, setTick] = useRecoilState(gameState.gameTick);
  const incrementByOne = () => setTick(tick + 1);

  // run or pause game
  const [running, setRunning] = useRecoilState(gameState.gameRunning);
  const go = () => setRunning(true);
  const stop = () => setRunning(false);

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
              <button onClick={incrementByOne}>Step</button>{' '}
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
