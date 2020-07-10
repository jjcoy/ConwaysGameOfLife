// front_end/src/components/Home.js

// standard imports
import React from 'react';
import './Home.css';

// import components
import GameBoard from './GameBoard';
import Controls from './Controls';

const Home = () => {
  return (
    <div className="Home">
      <div className="Home-title">
        <p className="title-text">Conway's Game of Life</p>
        <p>
          For more information, visit the{' '}
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Wikipedia page
          </a>
        </p>
      </div>
      <div className="Home-board">
        <GameBoard />
      </div>
      <div className="Home-controls">
        <Controls />
      </div>
    </div>
  );
};

export default Home;
