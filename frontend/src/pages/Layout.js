import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import UserBar from '../User/UserBar'
import Header from '../Header'
import { StateContext } from "../contexts";

export default function Layout () {
    const { state } = useContext(StateContext)
    const { user } = state

    return (
        <>
            <Header text="My To Do App" />
            <React.Suspense fallback={"Loading..."}>
                <UserBar />
            </React.Suspense> <br />
            <br />
            {user && <Link to="/toDos/create">Create New To Do Note</Link>}
            <Outlet />
        </>
    )
}