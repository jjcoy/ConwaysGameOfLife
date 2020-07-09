// front_end/src/components/ToDoListState.js

// standard imports
import { atom } from 'recoil'; // Recoil is a state management library

// this is an atom, that stores state across components (that are housed in a RecoilRoot element)
// this stores the list of TodoItems (see TodoItemCreator)
const todoListState = atom({
  key: 'todoListState',
  default: [],
});

export default todoListState;
