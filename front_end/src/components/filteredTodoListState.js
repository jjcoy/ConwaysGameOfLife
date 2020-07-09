// front_end/src/components/ToDoListState.js

// standard imports
import { selector } from 'recoil'; // Recoil is a state management library
import todoListState from './todoListState';
import todoListFilterState from './todoListFilterState';

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
