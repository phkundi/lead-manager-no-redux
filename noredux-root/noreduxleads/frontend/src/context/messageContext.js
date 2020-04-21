import React, { createContext, useReducer } from "react";
import messageReducer from "../reducers/messageReducer";

export const MessageContext = createContext();

const initialState = {
  message: {},
};

export function MessageProvider(props) {
  const [messages, dispatchMessages] = useReducer(messageReducer, initialState);
  const value = { messages, dispatchMessages };
  return (
    <MessageContext.Provider value={value}>
      {props.children}
    </MessageContext.Provider>
  );
}
