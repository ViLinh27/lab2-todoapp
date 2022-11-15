import React, { useEffect } from 'react'
import { useResource } from "react-request-hook"
import { useParams , useNavigate} from "react-router-dom";

import Todo from '../Todo/Todo'

export default function ToDoPage () {
    const {id} = useParams();
    const navigate = useNavigate();
    const [toDo, getTodo] = useResource( ()=> ({
        url: `/toDos/${id}`,
        method:'get'
    }))

    useEffect(getTodo,[id])

    useEffect(() => {
        navigate(`/toDos/${toDo.data.id}`);
    },[toDo])

    return(
        <div>
            {(toDo && toDo.data)
                ? <Todo {...toDo.data} />
                :'Loading...'
            }
            <hr/>
        </div>
    )
}