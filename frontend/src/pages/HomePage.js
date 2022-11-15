import React, { useEffect, useContext } from "react";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";
import Todolist from "../Todo/Todolist";

export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);
  const [toDos, getTodos] = useResource(() => ({
    url: "/toDos",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));
  useEffect(() => {
    getTodos();
  }, [state?.user?.access_token]);
  useEffect(() => {
    if (toDos && toDos.isLoading === false && toDos.data) {
      dispatch({ type: "FETCH_POSTS", toDos: toDos.data.toDos.reverse() });
    }
  }, [toDos]);
  return (
    <>
      {toDos?.isLoading && "To Dos loading..."} <Todolist />
    </>
  );
}