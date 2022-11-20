//idoes our app need specific global state?
import './App.css';
import React, {useEffect,useReducer,useState} from 'react';
// import { v4 as uuidv4 } from "uuid";
import appReducer from "./reducer";
import { useResource } from 'react-request-hook';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Todolist from './Todo/Todolist';
//import UserBar from './User/UserBar';
import CreateTodo from './Todo/CreateTodo';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ToDoPage from './pages/ToDoPage';

import {ThemeContext, StateContext} from "./contexts";
//import Header from "./Header";
//import ChangeTheme from "./ChangeTheme";

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

  const [ toDos, getToDos ] = useResource(() => ({ // -----need to get rid of?
    url: '/toDos',
    method: 'get',
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  useEffect(()=>{getToDos();}, [state?.user?.access_token]) // -----need to get rid of?

  /* useEffect(() => { // -----need to get rid of?
    if (toDos && toDos.isLoading === false && toDos.data) {
      dispatch({ type: 'FETCH_POSTS', toDos: toDos.data.reverse() })
    }
  }, [toDos]) */

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <div className="App-header">
         <StateContext.Provider value = {{state, dispatch}}>
            <ThemeContext.Provider value={ theme }>
              <BrowserRouter>
                <Routes>
                  {/* <Todolist /> */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                  </Route>

                  <Route path="/toDos" element={<Layout />}>
                    <Route path="/toDos/create" element={<CreateTodo />} />
                    <Route path="/toDos/:id" element={<ToDoPage />} />
                  </Route>
                  
                  {/* {state.user && <CreateTodo />}not sure if this is needed: onClick={() => onComplete(item.id)} */}
                </Routes>
              </BrowserRouter>
            </ThemeContext.Provider>
         </StateContext.Provider>
          
        </div>
      {/* </header> */}
    </div>
  );
}

export default App;
