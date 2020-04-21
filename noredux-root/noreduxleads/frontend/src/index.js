import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/App";
import { LeadProvider } from "./context/leadContext";
import { MessageProvider } from "./context/messageContext";
import { ErrorProvider } from "./context/errorContext";
import { AuthProvider } from "./context/authContext";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Alert options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

ReactDOM.render(
  <AuthProvider>
    <LeadProvider>
      <ErrorProvider>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <MessageProvider>
            <Router>
              <App />
            </Router>
          </MessageProvider>
        </AlertProvider>
      </ErrorProvider>
    </LeadProvider>
  </AuthProvider>,
  document.getElementById("root")
);
