import React, { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";

import classes from "../css/Login.module.css";

import logoImage from "../../images/logo.png";
import AuthFooter from "../components/AuthFooter";
import { authenticate, signin } from "../helpers";
import { Fragment } from "react";

const initialState = {
  loading: false,
  error: "",
  isSuccess: false,
  didRedirect: false,
};

const Login = () => {
  const [authState, setAuthState] = useState(initialState);

  const userIdRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    setAuthState((prevAuth) => ({
      ...prevAuth,
      loading: true,
    }));

    const userID = userIdRef.current.value;
    const password = passwordRef.current.value;

    signin({ user_id: userID, password })
      .then((data) => {
          const token = 24018234961823460
          const user_id = "ipruyp3498ry1"
          authenticate({ token, user_id }, () => {
            setAuthState((prevAuth) => ({
              ...prevAuth,
              isSuccess: true,
              loading: false,
              error: data.message,
              didRedirect: true,
            }));
          });
        }
      )
      .catch((err) => {
        setAuthState((prevAuth) => ({
          ...prevAuth,
          isSuccess: true,
          loading: false,
          error: err,
        }));
        userIdRef.current.value = "";
        passwordRef.current.value = "";
      });
  };

  const performRedirect = () => {
    if (authState.didRedirect) {
      return <Redirect to="/" />;
    } else {
      return <Fragment />;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes["form-container"]}>
        <h4>Login to Pluto</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User ID (eg: AB0001)"
            ref={userIdRef}
          />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <button type="submit" className={classes["btn-primary"]}>
            {authState.loading ? "Logging In" : "Login"}
          </button>
        </form>

        <Link to="/" className={classes["forgot-password"]}>
          {authState.error ? authState.error : "Forgot password?"}
        </Link>
      </div>

      {/* <AuthFooter /> */}
      {performRedirect()}
    </div>
  );
};

export default Login;
