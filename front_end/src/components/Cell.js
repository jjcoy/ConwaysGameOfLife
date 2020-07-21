// front_end/src/components/Cell.js
// CSS for how to draw the board was adapted from
// https://www.freecodecamp.org/news/create-gameoflife-with-react-in-one-hour-8e686a410174/

// standard imports
import React from 'react';
import { useRecoilValue } from 'recoil';
import './Cell.css';

// import the atoms that represent the game
import * as gameState from '../gameState';

const Cell = (props) => {
  const cellSize = useRecoilValue(gameState.cellSize);
  const { x, y } = props;

  return (
    // Draw the Cell in the proper location, specified by the x/y position and the cellSize
    <div
      className="Cell"
      style={{
        left: `${cellSize * x + 1}px`,
        top: `${cellSize * y + 1}px`,
        width: `${cellSize - 1}px`,
        height: `${cellSize - 1}px`,
      }}
    />
  );
};

export default Cell;
