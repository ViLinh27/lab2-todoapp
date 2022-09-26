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
    author: "paul"
  } 

  const [user,setUser] =useState('')
  const [posts, setPosts] = useState('')

  return (
    <div className="App">
      <header>
        <div>
          <UserBar user={user && <CreateTodo user={user}/>} posts={posts} setPosts = {setPosts}/>
          <Todolist/>
        </div>
      </header>
    </div>
  );
}

export default App;
