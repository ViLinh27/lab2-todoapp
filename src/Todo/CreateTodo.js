//make a to do to add to todolist
import {useState} from 'react';
import { v4 as uuidv4 } from "uuid";

export default function CreateTodo({user,toDos,dispatch}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateCreated, setDateCreated] = useState(Date());
    const [dateCompleted, setDateCompleted] = useState(Date());
    const [complete,setComplete] = useState(false);

    // function handleTitle (evt) {setTitle(evt.target.value)};

    // function handleDescription (evt) {setDescription(evt.target.value)};

    function handleComplete (evt) {setComplete(!complete)};

    // function handleDateCreated (evt) {setDateCreated(evt.target.value)};
   /*  function handleCreate(){
        const newTodo = {title,description, author:user}
        setToDos([newTodo,...toDos])
    } */

    return(//handecreate
        <form  
            onSubmit={e => 
                {
                    e.preventDefault();
                    dispatch({
                        type:"CREATE_TODO",
                        title:title,
                        dateCreated:dateCreated.toString(),
                        description:description,
                        author:user,
                        complete: complete,
                        dateCompleted:complete ? dateCompleted.toString() : "",
                        id:uuidv4(),
                    });

                    //setDateCreated();
                    //setComplete();
                }
        }> {/*put new post object in newpsot like in classcode?? need a new post here to set the todo? */}

            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" valule={title} onChange={(e) => setTitle(e.target.value)} name="create-title" id="create-title"/>
            </div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            {/* <div>
                <label htmlFor="complete">Complete:</label>
                <input type="checkbox" onChange={handleComplete} complete={complete}/>
            </div> */}
            
            <input type="submit" value="Create" disabled={title.length === 0}/>
        </form>
    )
}