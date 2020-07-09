import React from 'react'; // the main React library
import { useRecoilValue } from 'recoil'; // Recoil is a state management library
import todoListStatsState from './todoListStatsState';

// this component displays the summary of the to do list (number of items completed, etc)
// it uses a Recoil State selector to store the information (todoListStatsState)
function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

export default TodoListStats;
