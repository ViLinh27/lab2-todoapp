//contains individual to do items
import Todo from './Todo';
import {useContext,useEffect,useState} from 'react';
import {StateContext} from '../contexts';
import {useResource} from "react-request-hook";

//form needed to add new to do item to to todolist

//fix key at some point: need UUID instead of index or something-------
export default function Todolist(){{/*onComplete prop passed in from App.js */}
    const {state, dispatch } = useContext(StateContext);
    const {toDo,user} = state;

    return(
        <div>   
            {toDo.length === 0 && <h2>No posts found.</h2>}
            {toDo.length > 0 && toDo.map((t) =>
                <Todo {...t} key={t._id} 
                    item={t} 
                />)
            }
            {/*pass in onComplete prop for toggle reducer */}
            {/*destructure todos array and spread over  todo component with each property */}
        </div>
    );
}
//typically key of component in list is database identifier for each to do