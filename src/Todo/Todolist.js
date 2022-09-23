//contains individual to do items
import Todo from './Todo';

//form needed to add new to do item to to todolist

//fix key at some point: need UUID instead of index or something-------
export default function Todolist({todos=[]}){
    return(
        <div>   
            {todos.map((t,i) =><Todo {...t} key={'todo-'+i}/>)}
            {/*destructure todos array and spread over  todo component with each property */}
        </div>
    )
}