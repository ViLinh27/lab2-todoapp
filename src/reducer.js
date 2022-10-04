//states app needs:
//login
//registration
//logout
//creating posts form
//display posts

//what data drives above forms

//actions 1:52:31 week 3

function userReducer(state, action) {//reducer for user actions
  switch (action.type) {
    case "LOGIN"://same as register because we pass username
    case "REGISTER":
      return action.username;
    case "LOGOUT"://we don't need username anymore
      return "";
    default:
      return state;
  }
}

function toDoReducer(state, action){//reducer for toDo actions
    switch (action.type) {
        case "CREATE_TODO"://CreateTodo, Todolist and Todo components
            const newPost = {
                title: action.title,
                description: action.description,
                author: action.author,
                id: action.id,
            };
            return [newPost, ...state];//the new new task/todo
        default:
            return state;
  }
}

export default function appReducer(state, action) {//export to make the reducer functions usable
  return {
    user: userReducer(state.user, action),
    toDos: toDoReducer(state.toDos, action),
  };
}