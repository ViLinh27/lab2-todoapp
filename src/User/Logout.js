export default function Logout({user,dispatch}){//instead of setUser, deconstruct dispatch : Logout({user, dispatch})
    return(
        <form onSubmit={
            e => {e.preventDefault(); 
            dispatch({ type: "LOGOUT"});
        }}>{/*instead of setUser call dispatch with correct case: dispatch({type: "LOGOUT"}) */}
            Logged in as: <b>{user}</b>
            <input type="submit" value="Logout"/>
        </form>
    )
}