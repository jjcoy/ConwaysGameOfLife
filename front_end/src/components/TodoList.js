// front_end/src/components/ToDoList.js

// standard imports
import React from 'react'; // the main React library
import { useRecoilValue } from 'recoil'; // Recoil is a state management library
import todoListState from './ToDoListState';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';

function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

export default TodoList;
