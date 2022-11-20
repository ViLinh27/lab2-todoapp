import { StateContext } from "../contexts";
import {useContext} from "react";

export default function Logout(){//instead of setUser, deconstruct dispatch : Logout({user, dispatch})
    const {state,dispatch}  = useContext(StateContext);
    const {user} = state;
    
    return(
        <form className="Form-log" onSubmit={
            (e) => {e.preventDefault(); 
            dispatch({ type: "LOGOUT"});
        }}>{/*instead of setUser call dispatch with correct case: dispatch({type: "LOGOUT"}) */}
            Logged in as: <b> {user.username}</b>
            <input type="submit" value="Logout"/>
        </form>
    )
}