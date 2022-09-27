//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Todolist from './Todo/Todolist';
import UserBar from './User/UserBar';
import CreateTodo from './Todo/CreateTodo';
import {useState} from 'react';

function App() {
  const initialTodos={
    title: "first post",
    content: "content 1",
    //author: "paul"
  } 

  const [user,setUser] =useState('')
  const [toDos, setToDos] = useState(initialTodos)

  return (
    <div className="App">
      <header>
        <div>
          <UserBar user={user && <CreateTodo user={user} toDos={toDos} setToDos={setToDos}/>} setUser={setUser}/>
          <Todolist/>
        </div>
      </header>
    </div>
  );
}

export default App;
