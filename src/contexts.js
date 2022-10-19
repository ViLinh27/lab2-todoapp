import React from "react";

export const ThemeContext = React.createContext({
  primaryColor: "deepskyblue",
  secondaryColor: "coral",
});

export const StateContext = React.createContext({
    state: {},
    dispatch: () => {}
});
//init empty object for state value and dispatch funciton is empty funciton which will be used when no provider defined
