//to do item

//data props:
//title (should not submit wihtout) - required
//description -optional
//author -logged in user's name
//dateCreated -Date.now() - some js lib needed
//complete(boolean)
//dateCompleted() - dynamic

import React, { useState,useContext } from 'react';
import {ThemeContext} from '../contexts';

//pass in onComplete from todolist component
export default function Todo(
    {title,description,author,dateCreated,complete, onRemove,item,onComplete}){
    
    const {secondaryColor} = useContext(ThemeContext);
    const [dateCompleted] = useState(Date());
    return(
        <div className="Form-todo">
            <h3 style={{color:secondaryColor}}>{title}</h3>
            <div>Date Created: {dateCreated}</div>
            <div>Date Completed: {item.complete ? dateCompleted.toString() : ""}</div>
            <div>{description}</div>
            <i>Written by <b>{author}</b></i>
            <div >Task Complete: <input type="checkbox" onChange={() => onComplete(item.id)}/> {item.complete.toString()}</div>
            <button type="button" onClick={() => onRemove(item.id)}>Delete</button>{/*add an onClick to call passed in item (and id) and onRemove prop */}
        </div>
    )
}