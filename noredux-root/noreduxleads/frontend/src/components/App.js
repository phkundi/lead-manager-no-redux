import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Dashboard from "./leads/Dashboard";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import useAuthState from "../hooks/useAuthState";

export default function App() {
  const { loadUser, auth } = useAuthState();

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
