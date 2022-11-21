import React, { useEffect, useContext } from "react";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";
import Todolist from "../Todo/Todolist";

export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);
  const [toDo, getTodos] = useResource(() => ({
    url: "/toDo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));
  useEffect(() => {
    getTodos();
  }, [state?.user?.access_token]);
  useEffect(() => {
    if (toDo && toDo.isLoading === false && toDo.data) {
      dispatch({ type: "FETCH_POSTS", toDo: toDo.data.posts.reverse() });
    }
  }, [toDo]);
  return (
    <>
      {toDo?.isLoading && "To Dos loading..."} <Todolist />
    </>
  );
}