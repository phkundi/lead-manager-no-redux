import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import useInputState from "../../hooks/useInputState";
import { createMessage, returnErrors } from "../../actions/messages";
import { MessageContext } from "../../context/messageContext";
import { AuthContext } from "../../context/authContext";
import { ErrorContext } from "../../context/errorContext";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../../actions/types";
import axios from "axios";

function Register() {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const { dispatchMessages } = useContext(MessageContext);

  const [username, setUsername] = useInputState("");
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [password2, setPassword2] = useInputState("");

  const registerUser = ({ username, password, email }) => {
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
      email,
    });

    axios
      .post("/api/auth/register/", body, config)
      .then((res) => {
        dispatchAuth({ type: REGISTER_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
        dispatchAuth({ type: REGISTER_FAIL });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatchMessages(
        createMessage({ passwordsNotMatch: "Passwords do not match" })
      );
    } else {
      const newUser = { username, password, email };
      registerUser(newUser);
    }
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
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
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={setEmail}
              value={email}
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
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={setPassword2}
              value={password2}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
