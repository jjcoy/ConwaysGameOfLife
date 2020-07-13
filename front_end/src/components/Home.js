// front_end/src/components/Home.js

// standard imports
import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import './Home.css';

// import components
import GameBoard from './GameBoard';
import Controls from './Controls';

// import the atoms that represent the game
import * as gameState from '../gameState';

const Home = () => {
  // gather state information from the Recoil gameState
  const gameRows = useRecoilValue(gameState.rows);
  const gameCols = useRecoilValue(gameState.cols);
  const [gameCells, setGameCells] = useRecoilState(gameState.cellLife);

  // function to reset all cellLifes to being dead (false)
  const resetGameCells = () => {
    let cells = []; // cells will be a 2D array of booleans

    // build and set the cells to false, using rows and cols from the gameState to control the size
    for (let x = 0; x < gameCols; x++) {
      // x goes across the columns
      cells[x] = []; // make this an array
      for (let y = 0; y < gameRows; y++) {
        // y goes down the rows
        cells[x][y] = false;
      }
    }

    // return the newly built 2D array
    return cells;
  };

  return (
    <div className="Home">
      <div className="Home-title">
        <p className="title-text">Conway's Game of Life</p>
        <p>
          For more information, visit the{' '}
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Wikipedia page
          </a>
          <p>
            {gameRows}, {gameCols}
          </p>
        </p>
      </div>
      <div className="Home-board">
        <GameBoard />
      </div>
      <div className="Home-controls">
        <button onClick={resetGameCells}>Reset cells</button>
        <Controls />
      </div>
    </div>
  );
};

export default Home;
