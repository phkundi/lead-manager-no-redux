import { useContext } from "react";
import { ErrorContext } from "../context/errorContext";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { returnErrors } from "../actions/messages";
import { tokenConfig } from "../actions/auth";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchErrors } = useContext(ErrorContext);

  const loadUser = () => {
    axios
      .get("/api/auth/user/", tokenConfig(auth))
      .then((res) => {
        dispatchAuth({ type: USER_LOADED, payload: res.data });
      })
      .catch((err) => {
        dispatchErrors(returnErrors(err.response.data, err.response.status));
        dispatchAuth({ type: AUTH_ERROR });
      });
  };

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

  return {
    loadUser,
    loginUser,
    registerUser,
    auth,
  };
};

export default useAuthState;
