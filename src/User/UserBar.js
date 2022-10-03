//import {useState} from 'react';

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

export default function UserBar({user,setUser}){//instead of setUser it would have to be dispatch deconstructed here from parent App.js

    if(user){
        return <Logout user={user} setUser={setUser}/>//replace setUser with dispatch prop here: dispatch={dispatch}
    }
    else{
        return(
            <>
                <Login setUser={setUser} />{/*replace setUser with dispatch prop here: dispatch={dispatch} */}
                <Register setUser={setUser}/>{/*replace setUser with dispatch prop here: dispatch={dispatch} */}
            </>
        )
    }
}