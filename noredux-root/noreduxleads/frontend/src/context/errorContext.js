import React, { createContext, useReducer } from "react";
import errorReducer from "../reducers/errorReducer";

export const ErrorContext = createContext();

const initialState = {
  msg: {},
  status: null,
};

export function ErrorProvider(props) {
  const [errors, dispatchErrors] = useReducer(errorReducer, initialState);

  const value = { errors, dispatchErrors };
  return (
    <ErrorContext.Provider value={value}>
      {props.children}
    </ErrorContext.Provider>
  );
}
