import {useContext} from 'react';
import { StateContext } from "../contexts";

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

export default function UserBar(){//instead of setUser it would have to be dispatch deconstructed here from parent App.js

    const {state,dispatch} = useContext(StateContext);
    
    if(state.user){
        return <Logout/>//replace setUser with dispatch prop here: dispatch={dispatch}
    }
    else{
        return(
            <>
                <div className="userInput">
                     <Login />{/*replace setUser with dispatch prop here: dispatch={dispatch} */}
                </div>
                <div className="userInput">
                    <Register />{/*replace setUser with dispatch prop here: dispatch={dispatch} */}
                </div>
               
                
            </>
        )
    }
}