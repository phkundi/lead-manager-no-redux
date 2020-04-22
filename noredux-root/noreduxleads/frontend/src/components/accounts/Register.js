import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import useInputState from "../../hooks/useInputState";
import { createMessage } from "../../actions/messages";
import { MessageContext } from "../../context/messageContext";
import useAuthState from "../../hooks/useAuthState";

function Register() {
  const { registerUser, auth } = useAuthState();
  const { dispatchMessages } = useContext(MessageContext);

  const [username, setUsername] = useInputState("");
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [password2, setPassword2] = useInputState("");

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
