import {useState} from 'react';

export default function Register({setUser}){
    return(
        <form onSubmit={e => {e.preventDefault(); setUser(formData.username)}}>
            <label htmlFor="register-username">Username: </label>
            <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} name="register-username" id="register-username"/>

            <label>Password: </label>
            <input/>
            
        </form>
    )
}