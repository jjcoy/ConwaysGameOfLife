// front_end/src/components/GameBoard.js
// CSS for how to draw the board was adapted from
// https://www.freecodecamp.org/news/create-gameoflife-with-react-in-one-hour-8e686a410174/

// standard imports
import React from 'react';
import { useRecoilValue } from 'recoil';
import './GameBoard.css';
import Cell from './Cell';

// import the atoms that represent the game
import * as gameState from '../gameState';

const GameBoard = () => {
  // gather state information from the Recoil gameState
  const boardWidth = useRecoilValue(gameState.width);
  const boardHeight = useRecoilValue(gameState.height);
  const cellSize = useRecoilValue(gameState.cellSize);
  const liveCells = useRecoilValue(gameState.liveCells);

  return (
    <div
      className="GameBoard-board"
      style={{
        // must have back ticks around these for them to work correctly
        width: `${boardWidth}px`,
        height: `${boardHeight}px`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
      // onClick={this.handleClick}
      //   ref={(n) => {
      //     this.boardRef = n;
      //   }}
    >
      {/* Draw the cells that are alive as black squares on the board */}
      {liveCells.map((cell) => (
        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
      ))}
    </div>
  );
};

export default GameBoard;
