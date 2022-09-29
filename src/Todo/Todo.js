//to do item

//data props:
//title (should not submit wihtout) - required
//description -optional
//author -logged in user's name
//dateCreated -Date.now() - some js lib needed
//complete(boolean)
//dateCompleted() - dynamic

//checkbox with complete boolean needed

export default function Todo({title,description,author,dateCreated,complete,dateCompleted}){
    return(
        <div>
            <h3>{title}</h3>
            <div>Created: {dateCreated}</div>
            {/* <div>Completed: {dateCompleted}</div> */}
            <div>{description}</div>
            <i>Written by <b>{author}</b></i>
            <div>Task Complete: {complete}</div>
        </div>
    )
}