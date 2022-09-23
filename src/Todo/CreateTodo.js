//make a to do to add to todolist
import {useState} from 'react';

export default function CreateTodo({user}){
    const [todos, setTodos] = useState('')
    const [title, setTitle] = useState('')

    function handleTitle (evt) {setTitle(evt.target.value)}

    function handleCreate(){
        const newTodo = {title,author:user}
        setTodos([newTodo,...todos])
    }

    return(
        <form onSubmit={e => e.preventDefault()}>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" valule={title} onChange={handleTitle} name="create-title" id="create-title"/>
            </div>
            {/*<textarea value={} onChange={}/>*/}
            <input type="submit" value="Create"/>
        </form>
    )
}