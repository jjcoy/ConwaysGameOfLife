// front_end/src/components/Controls.js

// standard imports
import React from 'react';
import { useRecoilState } from 'recoil';

// import the atoms
import gameTick from '../gameState';

const Controls = () => {
  const [tick, setTick] = useRecoilState(gameTick);
  const incrementByOne = () => setTick(tick + 1);
  return (
    <div className="Controls-panel">
      <div className="Controls-tick">Tick: {tick}</div>
      <button onClick={incrementByOne}>Next</button>
    </div>
  );
};

export default Controls;
