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
  //state hooks
  const [user,setUser] =useState('');
  const [toDos, setToDos] = useState(initialTodos);
  //reducers would look like this:
  /*
    const [state,dispatch] = useReducer(appReducer,{
      user:"",
      toDos: initialTodos,
    });
  */
 //both user and toDo reducer functions invoked thanks to useReducer (above)
 //initial state for toDos is the array of toDos objects above.
 //initialTodos wouldn't show up when logged in due to Todolist coming in as undefined for some reason. Couldn't 
 //fix that in time.

  return (
    <div className="App">
      <header>
        <div>
          {/*setUser would be replaced by dispatch props here in each component: */}
          {/*would have to call state object then user property in some cases here (reducer) like this: state.user */}
          <UserBar user={user} setUser={setUser}/>
          <Todolist toDos={toDos} setToDos={setToDos}/>
          {user && <CreateTodo user={user} toDos={toDos} setToDos={setToDos}/>}
        </div>
      </header>
    </div>
  );
}

export default App;
