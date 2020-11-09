import React, { useEffect, useState } from "react";
import authFetch from "../../../authFetch";
import { IUser } from "../../../types/types";
import apiUrl from "../../../apiUrl";

interface IProps {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
}

function LoginForm(props: IProps) {
  useEffect(fetchUser, []);

  const [failureMessage, setFailureMessage] = useState<string>("");

  function fetchUser() {
    authFetch(apiUrl + "/user").then((json) => {
      if (json) props.setUser(json);
    });
  }

  function login() {
    const formElement = document.getElementById("loginForm") as HTMLFormElement;
    const formData = new FormData(formElement);

    setFailureMessage("");

    // @ts-ignore:
    fetch(apiUrl + "/login", {
      method: "POST",
      body: new URLSearchParams(formData as any),
    }).then((response) => {
      if (response.status !== 200)
        setFailureMessage("Invalid username and/or password");
      fetchUser();
    });
  }

  return (
    <div style={{ minWidth: "320px" }}>
      {!props.user && (
        <form method="POST" action="/" id="loginForm">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Email"
                autoFocus
                id="email"
                name="email"
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

      {!props.user && failureMessage && (
        <>
          <div className="has-text-danger">{failureMessage}</div>
        </>
      )}
    </div>
  );
}

export default LoginForm;
