//idoes our app need specific global state?
import './App.css';
import React, {useEffect,useReducer,useState} from 'react';
// import { v4 as uuidv4 } from "uuid";
import appReducer from "./reducer";
import { useResource } from 'react-request-hook';

import Todolist from './Todo/Todolist';
import UserBar from './User/UserBar';
import CreateTodo from './Todo/CreateTodo';
import {ThemeContext, StateContext} from "./contexts";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";

//down the road:
//register we will need persistence
//login: validate the data
//data persistence for create todo

function App() {
  const initialTodos=[];

  const [state,dispatch] = useReducer(appReducer,{
    user:"",
    toDos: initialTodos,
  });

  /* useEffect(() => {
    fetch('/api/toDos')
    .then(result => result.json())
    .then(toDos => dispatch({ type: 'FETCH_POSTS', toDos }))
  }, []) */

  const {user} = state;

  useEffect(() => {
      if (user) {
        document.title = `${user}’s Todo App`
      } 
      else {
        document.title = 'Todo App'
      }
    }, [user]);

  const [ toDos, getToDos ] = useResource(() => ({
    url: '/toDos',
    method: 'get'
  }))

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  useEffect(getToDos, [])

  useEffect(() => {
    if (toDos && toDos.data) {
      dispatch({ type: 'FETCH_POSTS', toDos: toDos.data.reverse() })
    }
  }, [toDos])

  /* function handleRemove(id){
    dispatch({type:"DELETE_TODO",id});
  }

  function handleComplete(id){
    dispatch({type: "TOGGLE_TODO", id});
  } */

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <div className="App-header">
         <StateContext.Provider value = {{state, dispatch}}>
            <ThemeContext.Provider value={ theme }>
              <Header title="My Todo" />

              <ThemeContext.Provider value={ theme }>
                <Header title="App"/>
              </ThemeContext.Provider>

              <ChangeTheme theme={theme} setTheme={setTheme} />

              <br/>
            
              {/*setUser would be replaced by dispatch props here in each component: */}
              {/*would have to call state object then user property in some cases here (reducer) like this: state.user */}
              <UserBar />
              <br/>

              <Todolist />{/*add in prop for complete toggle */}
              {state.user && <CreateTodo />}{/*not sure if this is needed: onClick={() => onComplete(item.id)} */}

            </ThemeContext.Provider>
         </StateContext.Provider>
          
        </div>
      {/* </header> */}
    </div>
  );
}

export default App;
