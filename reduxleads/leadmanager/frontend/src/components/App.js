import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";

export default function App() {
  return (
    <Provider store={store}>
      <>
        <Header />
        <div className="container">
          <Dashboard />
        </div>
      </>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
