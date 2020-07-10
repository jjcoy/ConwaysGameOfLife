// front_end/src/components/GameBoard.js
// CSS for how to draw the board was adapted from
// https://www.freecodecamp.org/news/create-gameoflife-with-react-in-one-hour-8e686a410174/

// standard imports
import React from 'react';
import './GameBoard.css';

const GameBoard = () => {
  const WIDTH = 800;
  const HEIGHT = 600;
  const CELL_SIZE = 20;
  return (
    <div
      className="GameBoard-board"
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
      }}
    ></div>
  );
};

export default GameBoard;
