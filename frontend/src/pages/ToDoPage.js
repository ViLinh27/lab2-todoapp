import React, { useEffect,useContext } from 'react'
import { useResource } from "react-request-hook"
import { useParams , useNavigate} from "react-router-dom";

import { StateContext } from "../contexts";

import Todo from '../Todo/Todo'

export default function ToDoPage () {
    const {id} = useParams();
    const { state, dispatch } = useContext(StateContext);

    const navigate = useNavigate();
    const [toDo, getTodo] = useResource( ()=> ({
        url: `/toDos/${id}`,
        method:'get',
        headers: { Authorization: `${state.user.access_token}` },
    }));

    useEffect(getTodo,[id])

    useEffect(() => {
        navigate(`/toDos/${toDo.data._id}`);
    },[toDo])

    return(
        <div>
            {toDo && toDo.data ? <Todo {...toDo.data} /> :'Loading...' }
            <hr/>
        </div>
    )
}