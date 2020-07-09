// front_end/src/components/ToDoList.js

// standard imports
import React from 'react'; // the main React library
import { useRecoilValue } from 'recoil'; // Recoil is a state management library
import filteredTodoListState from './filteredTodoListState';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import TodoListStats from './TodoListStats';
import TodoListFilters from './TodoListFilters';

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

export default TodoList;
