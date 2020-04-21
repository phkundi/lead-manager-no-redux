import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import useInputState from "../../hooks/useInputState";
import { AuthContext } from "../../context/authContext";
import { ErrorContext } from "../../context/errorContext";
import { returnErrors } from "../../actions/messages";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../../actions/types";

function Login() {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const [username, setUsername, resetUsername] = useInputState("");
  const [password, setPassword, resetPassword] = useInputState("");

  const loginUser = (username, password) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({
      username,
      password,
    });

    axios
      .post("/api/auth/login/", body, config)
      .then((res) => {
        dispatchAuth({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
        dispatchAuth({ type: LOGIN_FAIL });
      });
  };

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
