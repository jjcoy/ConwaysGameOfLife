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

  // game clock (tick)
  const [tick, setTick] = useRecoilState(gameState.gameTick);
  const incrementByOne = () => setTick(tick + 1);

  // function to get true or false
  const trueOrFalse = () => {
    return Math.random() > 0.5;
  };

  // function to reset all cellLifes to being dead (false), and a few random ones true
  const resetGameCells = () => {
    let cells = []; // cells will be a 2D array of booleans

    // build and set the cells to false, using rows and cols from the gameState to control the size
    for (let x = 0; x < gameCols; x++) {
      // x goes across the columns
      cells[x] = []; // make this an array
      for (let y = 0; y < gameRows; y++) {
        // y goes down the rows
        if (x % 2 === 0 && y % 2 === 0) {
          cells[x][y] = { x: x, y: y, live: trueOrFalse() };
        } else {
          cells[x][y] = { x: x, y: y, live: false };
        }
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
          <div>
            {gameRows}, {gameCols}
          </div>
        </div>
      </div>

      {/* The gameboard itself. */}
      <div className="Home-board">
        <GameBoard />
      </div>

      {/* The panel of controls, below the gameboard */}
      <div className="Controls-panel">
        <div className="Controls-tick">Tick: {tick}</div>
        <button onClick={incrementByOne}>Next</button>
        <button onClick={resetGameCells}>Reset cells</button>
      </div>
    </div>
  );
};

export default Home;
