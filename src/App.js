//idoes our app need specific global state?
import './App.css';
import React, {useEffect,useReducer,useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import appReducer from "./reducer";

import Todolist from './Todo/Todolist';
import UserBar from './User/UserBar';
import CreateTodo from './Todo/CreateTodo';
import {ThemeContext} from "./contexts";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";

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
      dateCompleted: "",
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

    const {user} = state;

    useEffect(() => {
        if (user) {
          document.title = `${user}’s Blog`
        } 
        else {
          document.title = 'Blog'
        }
      }, [user]);

  const [theme, setTheme] = useState({
   primaryColor: "deepskyblue",
    secondaryColor: "coral",
  })

  function handleRemove(id){
    dispatch({type:"DELETE_TODO",id});
  }

  function handleComplete(id){
    dispatch({type: "TOGGLE_TODO", id});
  }

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <div className="App-header">
          <ThemeContext.Provider value={ theme }>
            <Header title="My Todo" />
            <ThemeContext.Provider value={ theme }>
              <Header title="App"/>
            </ThemeContext.Provider>

            <ChangeTheme theme={theme} setTheme={setTheme} />
            
            {/*setUser would be replaced by dispatch props here in each component: */}
            {/*would have to call state object then user property in some cases here (reducer) like this: state.user */}
            <UserBar user={state.user} dispatch={dispatch}/>
            <Todolist toDos={state.toDos} onRemove={handleRemove} onComplete={handleComplete}/>{/*add in prop for complete toggle */}
            {state.user && <CreateTodo user={state.user} toDos={state.toDos} dispatch={dispatch} />}{/*not sure if this is needed: onClick={() => onComplete(item.id)} */}

          </ThemeContext.Provider>
          
        </div>
      {/* </header> */}
    </div>
  );
}

export default App;
