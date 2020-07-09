// front_end/src/components/Home.js

// standard imports
import React from 'react';

// import components
import GameBoard from './GameBoard';
import Controls from './Controls';

const Home = () => {
  return (
    <div className="Home">
      <div className="Title">
        <h1>Conway's Game of Life</h1>
        <p>
          For more information, visit the{' '}
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Wikipedia page
          </a>
        </p>
      </div>
      <div className="Board">
        <GameBoard />
      </div>
      <div className="Controls">
        <Controls />
      </div>
    </div>
  );
};

export default Home;
