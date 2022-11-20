import React, {useState,useContext,useEffect} from 'react';
import {StateContext} from "../contexts";
import {useResource} from "react-request-hook";

export default function Login(){//deconstruct dispatch instead of setUser
    const[username,setUsername] = useState('');

    const {dispatch} = useContext(StateContext);

    const [ loginFailed, setLoginFailed ] = useState(false);
    const [ password, setPassword ] = useState('');
    
    // useEffect(
    //     ()=>{
    //         dispatch({ type: "LOGIN", username});
    //     },[]
    // );

    const [user, login] = useResource((username, password) => ({
        url: "auth/login",
        method: "post",
        data: { username, password },
    }));

    function handlePassword (evt) { setPassword(evt.target.value) }

    useEffect(() => {
         if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setLoginFailed(true);
            } else {
                setLoginFailed(false);
                dispatch({
                    type: "LOGIN",
                    username: user.data.username,//user.data.username
                    access_token: user.data.access_token,
                });
            }
        }
    }, [user]);

    return(
        <>
            {loginFailed && (
                <span style={{ color: "red" }}>Invalid username or password</span>
            )}
            <form className="Form-log" onSubmit={(e)=> 
                {
                    e.preventDefault(); 
                    //dispatch({ type: "LOGIN", username});
                    login(username,password);
                }}
            > {/*instead of setUser call dispatch here: dispatch({type: "LOGIN", username}) */}
                <label htmlFor="login-username">Username: </label>
                <input type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} name="login-username" id="login-username"

                />
                {/**state needs to update after entire form updated (abovee) */}
                
                <label htmlFor="login-password">Password: </label>
                <input type="password" name="login-username" id="login-username" value={password} onChange={handlePassword}/>
                <input type="submit" value="Login" disabled={username.length === 0}/>
            </form>
        </>
    );
}