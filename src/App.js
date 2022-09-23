//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Todolist from './Todo/Todolist';
import CreateTodo from './Todo/CreateTodo';
import {useState} from 'react';

function App() {
  const initialTodos={

  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <CreateTodo/>
          <Todolist/>
        </div>
      </header>
    </div>
  );
}

export default App;
