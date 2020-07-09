// standard imports
import { atom } from 'recoil'; // Recoil is a state management library

const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

export default todoListFilterState;
