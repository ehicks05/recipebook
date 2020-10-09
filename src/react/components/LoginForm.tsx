import React, { useEffect, useState } from "react";
import authFetch from "../authFetch";
import { IUser } from "./types";

interface IProps {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
}

function LoginForm(props: IProps) {
  useEffect(fetchUser, []);

  const [failureMessage, setFailureMessage] = useState<string>("");

  function fetchUser() {
    authFetch("/user").then((json) => {
      if (json) props.setUser(json);
    });
  }

  function login() {
    const formElement = document.getElementById("loginForm") as HTMLFormElement;
    const formData = new FormData(formElement);

    setFailureMessage("");

    // @ts-ignore:
    fetch("/login", {
      method: "POST",
      body: new URLSearchParams(formData as any),
    }).then((response) => {
      if (response.status !== 200)
        setFailureMessage("Invalid username and/or password");
      fetchUser();
    });
  }

  function logout() {
    fetch("/logout")
      .then((response) => response.text())
      .then(() => {
        props.setUser(undefined);
      });
  }

  return (
    <div style={{ minWidth: "220px" }}>
      {!props.user && (
        <form method="POST" action="/" id="loginForm">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Email"
                autoFocus
                id="username"
                name="username"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                autoComplete="password"
              />
            </div>
          </div>
          <input
            type="button"
            value="Log in"
            className="button is-block is-primary is-fullwidth"
            onClick={login}
          />
        </form>
      )}
      {props.user && (
        <>
          Hi {props.user.username}!{" "}
          <button className="button is-danger is-fullwidth" onClick={logout}>
            Logout
          </button>
        </>
      )}
      {!props.user && failureMessage && (
        <>
          <div className="has-text-danger">{failureMessage}</div>
        </>
      )}
    </div>
  );
}

export default LoginForm;
