//contains individual to do items
import Todo from './Todo';

//form needed to add new to do item to to todolist

//fix key at some point: need UUID instead of index or something-------
export default function Todolist({toDos=[]}){
    return(
        <div>   
            {toDos.map((t,i) =><Todo {...t} key={t.id}/>)}
            {/*destructure todos array and spread over  todo component with each property */}
        </div>
    )
}
//typically key of component in list is database identifier for each to do