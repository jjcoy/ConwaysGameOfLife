// front_end/src/components/ToDoListState.js

// standard imports
import { selector } from 'recoil'; // Recoil is a state management library
import todoListState from './todoListState';
import todoListFilterState from './todoListFilterState';

// this is a selector, which in this case is a (new) list that is of a subset of the todo list
// it depends on the two atoms:
// current state of the filter drop down (todoListFilterState) as well as
// the actual to do list
const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export default filteredTodoListState;
