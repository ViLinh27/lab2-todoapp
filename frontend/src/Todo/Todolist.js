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

    const [error,setError] = useState(false);

    const [ toDodel, removeToDo ] = useResource(({id,title,dateCreated,complete,description, author}) => ({
        url: `/toDo/${id}`,
        method: 'delete',
        data:{id,title,dateCreated,complete,description, author}
    }))

    const[toDoComplete, toggleTodoComplete] = useResource(({complete,id}) =>({
        url:`/toDo/${id}`,
        method:`patch`,
        data:{complete,id},
    }));

    useEffect(()=>{
        if(toDodel?.data?.error){
            setError(true)
        }
        //console.log("useEffect for remove note called");
        if(toDodel?.isLoading === false && toDodel?.data){
            console.log("onto the dispatch");
            dispatch({
                type:"DELETE_TODO",
                id:toDodel.data.id,
                title:toDodel.data.title,
                dateCreated:toDodel.data.dateCreated,
                complete:toDodel.data.complete,
                description:toDodel.data.description, 
                author:toDodel.data.author
            });
        }
        if(toDoComplete?.isLoading === false && toDoComplete?.data){
            dispatch({
                type: "TOGGLE_TODO",
                complete:toDoComplete.data.complete,
                id:toDoComplete.data.id
            });
        }
    },[toDodel,toDoComplete])

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

    function handleComplete(complete,id){
        //dispatch({type: "TOGGLE_TODO", id});
        toggleTodoComplete({
            complete,
            id
        })
    }
    return(
        <div>   
            {toDo.length === 0 && <h2>No posts found.</h2>}
            {toDo.length > 0 && toDo.map((t) =>
                <Todo {...t} key={t._id} 
                    onRemove={()=>{
                        handleRemove(
                            t.id,
                            t.title,
                            t.dateCreated,
                            t.complete,
                            t.description,
                            t.author
                        )
                    }} 
                    item={t} 
                    onComplete={()=>{
                        handleComplete(t.complete,t.id)
                    }}
                        
                />)
            }
            {/*pass in onComplete prop for toggle reducer */}
            {/*destructure todos array and spread over  todo component with each property */}
        </div>
    );
}
//typically key of component in list is database identifier for each to do