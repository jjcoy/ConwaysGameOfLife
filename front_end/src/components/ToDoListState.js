// front_end/src/components/ToDoListState.js

// standard imports
import { atom } from 'recoil'; // Recoil is a state management library

const todoListState = atom({
  key: 'todoListState',
  default: [],
});

export default todoListState;
