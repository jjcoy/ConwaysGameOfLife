// front_end/src/components/Home.js

// standard imports
import React from 'react';
import ToDoList from './TodoList';

const Home = () => {
  return (
    <div className="Home">
      <div className="Title">
        <h1>Title</h1>
        <ToDoList />
      </div>
    </div>
  );
};

export default Home;
