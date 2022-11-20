//make a to do to add to todolist
import {useState,useContext,useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";
import {useResource} from "react-request-hook";

import {StateContext} from "../contexts";

export default function CreateTodo(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateCreated, setDateCreated] = useState(Date());
    const [dateCompleted, setDateCompleted] = useState(Date());
    const [complete,setComplete] = useState(false);
    const [error,setError] = useState(false);

    const {state, dispatch} = useContext(StateContext);
    const {user} =state;

    const[toDo, createTodo] = useResource(({title,dateCreated,complete,description,author}) =>({
        url:"/toDos",
        method:"post",
        headers: {Authorization : `${state.user.access_token}`},
        data:{title,dateCreated,complete,description, author},
    }));

    function handleCreate(){
        createTodo({title,dateCreated,complete,description,author:user})
    }

    useEffect(()=>{
        if(toDo?.isLoading === false && toDo.data){
             dispatch({
                type:"CREATE_TODO",
                title:toDo.data.title,
                dateCreated:toDo.data.dateCreated,
                complete:toDo.data.complete,
                description:toDo.data.description, 
                author:user.username,
                id:toDo.data.id
            });
        }
    },[toDo]);

    return(//handecreate
        <form  
            onSubmit={e => 
                {
                    e.preventDefault();
                    handleCreate();

                    //setDateCreated();
                    //setComplete();
                }
        }> {/*put new post object in newpsot like in classcode?? need a new post here to set the todo? */}

            <div>Author: <b>{user.username}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="create-title" id="create-title"/>
            </div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            {/* <div>
                <label htmlFor="complete">Complete:</label>
                <input type="checkbox" onChange={handleComplete} complete={complete}/>
            </div> */}
            
            <input type="submit" value="Create" />
        </form>
    );
}