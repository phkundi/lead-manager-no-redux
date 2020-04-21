import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { ErrorContext } from "../../context/errorContext";
import { Link } from "react-router-dom";
import { LOGOUT_SUCCESS } from "../../actions/types";
import { returnErrors } from "../../actions/messages";
import { tokenConfig } from "../../actions/auth";
import axios from "axios";

function Header() {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchErrors } = useContext(ErrorContext);
  const { isAuthenticated, user } = auth;

  const logout = () => {
    axios
      .post("/api/auth/logout/", null, tokenConfig(auth))
      .then((res) => {
        dispatchAuth({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
      });
  };

  const authLinks = (
    <ul className="navbar-nav mr-auto">
      <span className="navbar-text mr-3">
        <strong>{user ? `Welcome, ${user.username}` : ""}</strong>
      </span>
      <li className="nav-item">
        <button
          className="nav-link btn btn-info btn-sm text-light"
          onClick={logout}
        >
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Lead Manager No Redux
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
}

export default Header;
