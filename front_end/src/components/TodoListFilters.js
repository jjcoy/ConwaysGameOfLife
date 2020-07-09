import React from 'react'; // the main React library
import { useRecoilState } from 'recoil'; // Recoil is a state management library
import todoListFilterState from './todoListFilterState';

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  // drop down box, when selected, updateFilter() changes the RecoilState of the todoListFilterState atom
  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

export default TodoListFilters;
