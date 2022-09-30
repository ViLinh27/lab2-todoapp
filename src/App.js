//idoes our app need specific global state?
import './App.css';
import React from 'react';
import Todolist from './Todo/Todolist';
import UserBar from './User/UserBar';
import CreateTodo from './Todo/CreateTodo';
import {useState} from 'react';
import { v4 as uuidv4 } from "uuid";

//down the road:
//register we will need persistence
//login: validate the data
//data persistence for create todo

function App() {
  const initialTodos=[
    {
      title: "first post",
      description: "content 1",
      author: "111",
      id: uuidv4(),
    } ,
    {
      title: "second todo",
      description: "content 2",
      author: "222",
      id: uuidv4(),
    },

  ];
  //global states:
  const [user,setUser] =useState('');
  const [toDos, setToDos] = useState(initialTodos);

  return (
    <div className="App">
      <header>
        <div>

          <UserBar user={user} setUser={setUser}/>
          {/* {user && <Todolist toDos={toDos} setToDos={setToDos}/>} */}
          <Todolist toDos={toDos} setToDos={setToDos}/>
          {user && <CreateTodo user={user} toDos={toDos} setToDos={setToDos}/>}
          {/* <CreateTodo user={user} toDos={toDos} setToDos={setToDos}/> */}
        </div>
      </header>
    </div>
  );
}

export default App;
