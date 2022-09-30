//states app needs:
//login
//registration
//logout
//creating posts form
//display posts

//what data drives above forms

//actions 1:52:31 week 3

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}