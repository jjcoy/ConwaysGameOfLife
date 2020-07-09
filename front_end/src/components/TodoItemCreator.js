import React from 'react'; // the main React library
import { useState } from 'react';
import { useSetRecoilState } from 'recoil'; // Recoil is a state management library
import todoListState from './ToDoListState';

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState(''); // local state for this component
  const setTodoList = useSetRecoilState(todoListState); // link to recoil state

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

export default TodoItemCreator;
