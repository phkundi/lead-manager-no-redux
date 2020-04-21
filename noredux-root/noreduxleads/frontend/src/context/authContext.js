import React, { createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export function AuthProvider(props) {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);

  const value = { auth, dispatchAuth };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
