import React, { createContext, useReducer } from "react";
import leadReducer from "../reducers/leadReducer";

export const LeadContext = createContext();

const initialState = {
  leads: [],
};

export function LeadProvider(props) {
  const [leads, dispatchLeads] = useReducer(leadReducer, initialState);
  const value = { leads, dispatchLeads };
  return (
    <LeadContext.Provider value={value}>{props.children}</LeadContext.Provider>
  );
}
