import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import useInputState from "../../hooks/useInputState";
import useAuthState from "../../hooks/useAuthState";

function Login() {
  const { loginUser, auth } = useAuthState();
  const [username, setUsername, resetUsername] = useInputState("");
  const [password, setPassword, resetPassword] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
    resetUsername();
    resetPassword();
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={setUsername}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={setPassword}
                value={password}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
