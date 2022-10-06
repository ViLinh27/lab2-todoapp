//contains individual to do items
import Todo from './Todo';

//form needed to add new to do item to to todolist

//fix key at some point: need UUID instead of index or something-------
export default function Todolist({toDos=[], onRemove}){
    return(
        <div>   
            {toDos.map((t) =><Todo {...t} key={t.id} onRemove={onRemove} item={t}/>)}
            {/*destructure todos array and spread over  todo component with each property */}
        </div>
    )
}
//typically key of component in list is database identifier for each to do