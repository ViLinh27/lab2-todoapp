//to do item

//data props:
//title (should not submit wihtout) - required
//description -optional
//author -logged in user's name
//dateCreated -Date.now() - some js lib needed
//complete(boolean)
//dateCompleted() - dynamic

import React, { useState,useContext,useEffect } from 'react';
import {ThemeContext} from '../contexts';
import {useResource} from "react-request-hook";
import { Link } from 'react-router-dom'
import {StateContext} from "../contexts";

//pass in onComplete from todolist component
function Todo(
    {title,description,author,dateCreated,complete,item,_id}){
    
    const {secondaryColor} = useContext(ThemeContext);
    const [dateCompleted] = useState(Date());

    const[isChecked,setIsChecked] = useState(false);//test

    const {state, dispatch } = useContext(StateContext);

    const [error,setError] = useState(false);

    const [ toDodel, removeToDo ] = useResource((_id,title,dateCreated,complete,description, author) => ({
        url: `/toDo/delete/${_id}`,
        method: 'delete',
        headers: {Authorization : `${state.user.access_token}`},
        data:{_id,title,dateCreated,complete,description, author},
    }))

    const[toDoComplete, toggleTodoComplete] = useResource(({complete}) =>({
        url:`/toDo/toggle/${_id}`,
        method:'patch',
        headers: {Authorization : `${state.user.access_token}`},
       data:{complete},
    }));

    useEffect(()=>{
        //console.log("useEffect for remove note called");
        if(toDodel.isLoading === false && toDodel?.data){
            dispatch({
                type:"DELETE_TODO",
                id:toDodel.data._id,
                title:toDodel.data.title,
                dateCreated:toDodel.data.dateCreated,
                dateCompleted:toDodel.data.dateCompleted,
                complete:toDodel.data.complete,
                description:toDodel.data.description, 
                author:toDodel.data.author
            });
        }
    },[toDodel])
    useEffect(()=>{
        if(toDoComplete.isLoading === false && toDoComplete?.data){
            dispatch({
                type: "TOGGLE_TODO",
                 
                complete:toDoComplete.data.complete
            });
        }
    },[toDoComplete])

/*     function handleRemove(id,title,dateCreated,complete,description,author){
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
    } */

    return(
        <div className="Form-todo">
            {/* <h3 style={{color:secondaryColor}}>{title}</h3> */}
            <Link to={`/toDo/${_id}`}>
                <h3 style={{color: "black"}}>{title}</h3>
            </Link>
            <div>Date Created: {dateCreated}</div>
            <div>Date Completed: {item.complete ? dateCompleted.toString() : ""}</div>
            {/* <div>{description}</div> */}
           {/*  <div>{processedContent}</div>
                {
                    short && <div> <Link to={`/toDos/${id}`}>View full post</Link> </div>
                } */}
            <div>{description}</div>
            <i>Written by <b>{author}</b></i>
            <div >Task Complete: 
                <input type="checkbox" checked={isChecked} onChange={
                    (e)=>{
                        e.preventDefault();
                        toggleTodoComplete(complete);
                        
                        console.log("checkbox has been checked");

                        setIsChecked(e.currentTarget.checked);
                    }
                }/>
            </div>{/*add an onClic */}
            <button type="button" onClick={
                (e) =>{
                    e.preventDefault();
                    removeToDo(_id,title,dateCreated,complete,description, author);
                    //  dispatch({
                    //     type:"DELETE_TODO",
                    //     id:_id,
                    //     title:title,
                    //     dateCreated:dateCreated,
                    //     complete:complete,
                    //     description:description, 
                    //     author:author
                    // });
                }
            }>Delete</button>{/*add an onClic */}
        </div>
    );
}

export default React.memo(Todo);