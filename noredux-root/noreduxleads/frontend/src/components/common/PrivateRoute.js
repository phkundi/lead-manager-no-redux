import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading ...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} auth={auth} />;
        }
      }}
    />
  );
}

export default PrivateRoute;
