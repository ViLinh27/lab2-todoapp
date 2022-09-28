//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Todolist from './Todo/Todolist';
import UserBar from './User/UserBar';
import CreateTodo from './Todo/CreateTodo';
import {useState} from 'react';

function App() {
  const initialTodos=[
    {
      title: "first post",
      description: "content 1",
      //author: "paul"
    } ,
    {
      title: "second todo",
      description: "content 2",
    },

  ];

  const [user,setUser] =useState('');
  const [toDos, setToDos] = useState(initialTodos);

  return (
    <div className="App">
      <header>
        <div>

          <UserBar user={user} setUser={setUser}/>
          <Todolist toDos={toDos}/>
          {user && <CreateTodo user={user} toDos={toDos} setToDos={setToDos}/>}
          {/* <CreateTodo user={user} toDos={toDos} setToDos={setToDos}/> */}
        </div>
      </header>
    </div>
  );
}

export default App;
