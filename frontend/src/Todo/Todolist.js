//contains individual to do items
import Todo from './Todo';
import {useContext,useEffect,useState} from 'react';
import {StateContext} from '../contexts';
import {useResource} from "react-request-hook";

//form needed to add new to do item to to todolist

//fix key at some point: need UUID instead of index or something-------
export default function Todolist(){{/*onComplete prop passed in from App.js */}
    const {state, dispatch } = useContext(StateContext);
    const {toDos,user} = state;

    const [error,setError] = useState(false);

    const [ toDo, removeToDo ] = useResource(({id,title,dateCreated,complete,description, author}) => ({
        url: `/toDos/${id}`,
        method: 'delete',
        data:{id,title,dateCreated,complete,description, author}
    }))

    const[toDoComplete, toggleTodoComplete] = useResource(({id,title,dateCreated,complete,description, author}) =>({
        url:`/toDos/${id}`,
        method:`put`,
        data:{id,title,dateCreated,complete,description, author},
    }));

    useEffect(()=>{
        if(toDo?.data?.error){
            setError(true)
        }
        //console.log("useEffect for remove note called");
        if(toDo?.isLoading === false && toDo?.data){
            console.log("onto the dispatch");
            dispatch({
                type:"DELETE_TODO",
                id:toDo.data.id,
                title:toDo.data.title,
                dateCreated:toDo.data.dateCreated,
                complete:toDo.data.complete,
                description:toDo.data.description, 
                author:toDo.data.author
            });
        }
        if(toDoComplete?.isLoading === false && toDoComplete?.data){
            dispatch({
                type: "TOGGLE_TODO", 
                id:toDoComplete.data.id,
                title:toDoComplete.data.title,
                dateCreated:toDoComplete.data.dateCreated,
                complete:toDoComplete.data.complete,
                description:toDoComplete.data.description, 
                author:toDoComplete.data.author
            });
        }
    },[toDo,toDoComplete])

    function handleRemove(id,title,dateCreated,complete,description,author){
        console.log("handleRemove is called");
        //dispatch({type:"DELETE_TODO",id});
        removeToDo({
                id,
                title,
                dateCreated,
                complete,
                description,
                author
        })
        
    }

    function handleComplete(id,title,dateCreated,complete,description,author){
        //dispatch({type: "TOGGLE_TODO", id});
        toggleTodoComplete({
            id,
            title,
            dateCreated,
            complete,
            description,
            author
        })
    }
    return(
        <div>   
            {toDos.map((t) =><Todo {...t} key={t.id} onRemove={()=>{handleRemove(t.id,t.title,t.dateCreated,t.complete,t.description,t.author)}} item={t} onComplete={()=>{handleComplete(t.id,t.title,t.dateCreated,t.complete,t.description,t.author)}}/>)}{/*pass in onComplete prop for toggle reducer */}
            {/*destructure todos array and spread over  todo component with each property */}
        </div>
    )
}
//typically key of component in list is database identifier for each to do