// front_end/src/components/ToDoListState.js

// standard imports
import { selector } from 'recoil'; // Recoil is a state management library
import todoListState from './todoListState';

// a Recoil State selector is a piece of data derived from a recoil state
// in other words, it is some information that is dependent on the state
// in this case, it is the number of items marked done, etc, in the todoList state
const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export default todoListStatsState;
