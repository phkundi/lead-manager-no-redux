import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { ErrorContext } from "../context/errorContext";
import { returnErrors } from "../actions/messages";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Dashboard from "./leads/Dashboard";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import { USER_LOADED, AUTH_ERROR } from "../actions/types";
import { tokenConfig } from "../actions/auth";

export default function App() {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchErrors } = useContext(ErrorContext);

  const loadUser = () => {
    axios
      .get("/api/auth/user", tokenConfig(auth))
      .then((res) => {
        dispatchAuth({ type: USER_LOADED, payload: res.data });
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
        dispatchAuth({ type: AUTH_ERROR });
      });
  };

  useEffect(() => {
    loadUser();
  }, [auth.isAuthenticated]);

  return (
    <>
      <Header />
      <Alerts />
      <div className="container">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} auth={auth} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </>
  );
}
