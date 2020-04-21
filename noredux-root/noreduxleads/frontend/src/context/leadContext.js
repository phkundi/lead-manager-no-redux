import React, { createContext, useReducer } from "react";
import leadReducer from "../reducers/leadReducer";

export const LeadContext = createContext();

const initialState = {
  leads: [],
};

export function LeadProvider(props) {
  const [state, dispatch] = useReducer(leadReducer, initialState);
  const value = { state, dispatch };
  return (
    <LeadContext.Provider value={value}>{props.children}</LeadContext.Provider>
  );
}
