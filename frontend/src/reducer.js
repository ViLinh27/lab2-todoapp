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
       return {
          username: action.username,
          access_token: action.access_token,
        };
    case "LOGOUT"://we don't need username anymore
      return null;

    default:
      return state;
  }
}

function toDoReducer(state, action){//reducer for toDo actions
    switch (action.type) {
        case "CREATE_TODO"://CreateTodo, Todolist and Todo components
            const newPost = {
                title: action.title,
                dateCreated: action.dateCreated,
                description: action.description,
                author: action.author,
                complete:action.complete,
                dateCompleted: action.dateCompleted,
                id: action.id,
            };
            return [newPost, ...state];//the new new task/todo
        case "TOGGLE_TODO":
            return state.map(
              (item) => {
                if(item.id === action.id){
                  return{...item, 
                          complete: !action.complete, 
                          dateCompleted: action.dateCompleted 
                        };
                }else{
                  return item;
                }
              }
            );
        case "DELETE_TODO":
            return state.filter((item) => item.id !== action.id);
        case 'FETCH_POSTS':
            return action.toDo;
        case 'CLEAR_TODO':
              return [];
        default:
            return state;
  }
}

export default function appReducer(state, action) {//export to make the reducer functions usable
  return {
    user: userReducer(state.user, action),
    toDo: toDoReducer(state.toDo, action),
  };
}