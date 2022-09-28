//make a to do to add to todolist
import {useState} from 'react';

export default function CreateTodo({user,toDos,setToDos}){
    //const [todos, setTodos] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function handleTitle (evt) {setTitle(evt.target.value)}

    function handleDescription (evt) {setDescription(evt.target.value)}

    function handleCreate(){
        const newTodo = {title,description, author:user}
        setToDos([newTodo,...toDos])
    }

    return(//handecreate
        <form onSubmit={e => {e.preventDefault();handleCreate}}>{/*put new post object in newpsot like in classcode?? need a new post here to set the todo? */}

            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" valule={title} onChange={handleTitle} name="create-title" id="create-title"/>
            </div>
            <textarea value={description} onChange={handleDescription}/>
            <input type="submit" value="Create" disabled={title.length === 0}/>
        </form>
    )
}