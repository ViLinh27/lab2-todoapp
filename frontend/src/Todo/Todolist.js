//contains individual to do items
import Todo from './Todo';
import {useContext} from 'react';
import {StateContext} from '../contexts';
import {useResource} from "react-request-hook";

//form needed to add new to do item to to todolist

//fix key at some point: need UUID instead of index or something-------
export default function Todolist({onRemove,onComplete}){{/*onComplete prop passed in from App.js */}
    const {state, dispatch } = useContext(StateContext);
    const {toDos} = state;

    function handleRemove(id){
        dispatch({type:"DELETE_TODO",id});
    }

    function handleComplete(id){
        dispatch({type: "TOGGLE_TODO", id});
    }
    return(
        <div>   
            {toDos.map((t) =><Todo {...t} key={t.id} onRemove={handleRemove} item={t} onComplete={handleComplete}/>)}{/*pass in onComplete prop for toggle reducer */}
            {/*destructure todos array and spread over  todo component with each property */}
        </div>
    )
}
//typically key of component in list is database identifier for each to do