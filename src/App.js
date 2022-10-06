//idoes our app need specific global state?
import './App.css';
//import React from 'react';
import {useReducer} from 'react';//don't need the useState i guess
import { v4 as uuidv4 } from "uuid";
import appReducer from "./reducer";

import Todolist from './Todo/Todolist';
import UserBar from './User/UserBar';
import CreateTodo from './Todo/CreateTodo';

//down the road:
//register we will need persistence
//login: validate the data
//data persistence for create todo

function App() {
  const initialTodos=[
    {
      title: "first post",
      dateCreated: "Tues Oct 4",
      description: "content 1",
      author: "111",
      complete: false,
      dateCompleted: "Tues Oct 4",
      id: uuidv4(),
    } ,
    {
      title: "second todo",
      dateCreated: "Tues Oct 4",
      description: "content 2",
      author: "222",
      complete: false,
      dateCompleted: "",
      id: uuidv4(),
    },

  ];
  //state hooks
  //const [user,setUser] =useState('');
  //const [toDos, setToDos] = useState(initialTodos);

  //reducers would look like this:
    const [state,dispatch] = useReducer(appReducer,{
      user:"",
      toDos: initialTodos,
    });
  
 //both user and toDo reducer functions invoked thanks to useReducer (above)
 //initial state for toDos is the array of toDos objects above.
 //initialTodos wouldn't show up when logged in due to Todolist coming in as undefined for some reason. Couldn't 
 //fix that in time.

  function handleRemove(id){
    dispatch({type:"DELETE_TODO",id});
  }

  /* function handleComplete(id){
    dispatch({type: "TOGGLE_TODO", id});
  } */

  return (
    <div className="App">
      <header>
        <div>
          {/*setUser would be replaced by dispatch props here in each component: */}
          {/*would have to call state object then user property in some cases here (reducer) like this: state.user */}
          <UserBar user={state.user} dispatch={dispatch}/>
          <Todolist toDos={state.toDos} onRemove={handleRemove}/>{/*add in prop for complete toggle */}
          {state.user && <CreateTodo user={state.user} toDos={state.toDos} dispatch={dispatch} />}{/*not sure if this is needed: onClick={() => onComplete(item.id)} */}
        </div>
      </header>
    </div>
  );
}

export default App;
