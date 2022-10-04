//import {useState} from 'react';

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

export default function UserBar({user,dispatch}){//instead of setUser it would have to be dispatch deconstructed here from parent App.js

    if(user){
        return <Logout user={user} dispatch={dispatch}/>//replace setUser with dispatch prop here: dispatch={dispatch}
    }
    else{
        return(
            <>
                <Login dispatch={dispatch} />{/*replace setUser with dispatch prop here: dispatch={dispatch} */}
                <Register dispatch={dispatch}/>{/*replace setUser with dispatch prop here: dispatch={dispatch} */}
            </>
        )
    }
}