import {useState, useContext,useEffect} from 'react';
import {StateContext} from '../contexts';
import {useResource} from "react-request-hook";

export default function Register(){  //replace setUser with dispatch when deconstructing (passed from parent App.js)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const {dispatch} = useContext(StateContext);

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }
    function handlePasswordRepeat(evt) {
        setPasswordRepeat(evt.target.value);
    }
    
    const [ status, setStatus] = useState("")
    const [user, register] = useResource((username, password) => ({
        url: "auth/register",
        method: "post",
        data: { username, password, passwordConfirmation: password },
    }));

    /* useEffect(() => {
        if (user && user.data) {
        dispatch({ type: "REGISTER", username: user.data.user.email });
        }
    }, [user]); */

    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setStatus("Registration failed, please try again later.");
            } else {
                setStatus("Registration successful. You may now login.");
            }
        }
    }, [user]);
    
    return(
        <form className="Form-log" onSubmit={
            e => {
                e.preventDefault(); 
                //dispatch({type:"REGISTER", username});
                register(username,password);
            }}>{/*istad of setUser we call dispatch and the REGISTER action */}

            <label htmlFor="register-username">Username: </label>
            <input type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                name="register-username" 
                id="register-username"/>

            <label htmlFor="register-password">Password: </label>
            <input 
                type="password" 
                name="register-password" 
                id="register-password" 
                value={password} 
                onChange={handlePassword} />

            <label htmlFor="register-password-repeat">Repeat password: </label>
            <input 
                type="password" 
                name="register-password-repeat" 
                id="register-password-repeat" 
                value={passwordRepeat}
                onChange={handlePasswordRepeat}
             />

            <input 
                type="submit" 
                value="Register" 
                disabled={
                    username.length===0 || 
                    password.length === 0 || 
                    password !== 
                    passwordRepeat
                }/>

            <p>{status}</p>
        </form>
    )
}