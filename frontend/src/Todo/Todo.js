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
    {title,description,author,dateCreated,complete, onRemove,item,onComplete,id}){
    
    const {secondaryColor} = useContext(ThemeContext);
    const [dateCompleted] = useState(Date());

    /* const handleChecked = event =>{

    }; */

    //console.log("Todo rendered");

    return(
        <div className="Form-todo">
            {/* <h3 style={{color:secondaryColor}}>{title}</h3> */}
            <Link to={`/toDo/${id}`}>
                <h3 style={{color: "black"}}>{title}</h3>
            </Link>
            <div>Date Created: {dateCreated}</div>
            <div>Date Completed: {item.complete ? dateCompleted : ""}</div>
            {/* <div>{description}</div> */}
           {/*  <div>{processedContent}</div>
                {
                    short && <div> <Link to={`/toDos/${id}`}>View full post</Link> </div>
                } */}
            <div>{description}</div>
            <i>Written by <b>{author}</b></i>
            <div >Task Complete: <input type="checkbox" onClick={onComplete}/></div>
            <button type="button" onClick={onRemove}>Delete</button>{/*add an onClick to call passed in item (and id) and onRemove prop */}
        </div>
    );
}

export default React.memo(Todo);