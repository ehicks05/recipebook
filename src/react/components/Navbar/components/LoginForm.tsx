import React, { FormEvent, useEffect, useState } from "react";
import authFetch from "../../../authFetch";
import { IUser } from "../../../types/types";

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

  function login(e: FormEvent) {
    e.preventDefault();
    const formElement = document.getElementById("loginForm") as HTMLFormElement;
    const formData = new FormData(formElement);

    setFailureMessage("");

    // @ts-ignore:
    authFetch("/login", {
      method: "POST",
      body: new URLSearchParams(formData as any),
    }, false).then((response) => {
      if (response.status !== 200)
        setFailureMessage("Invalid username and/or password");
      fetchUser();
    });
  }

  return (
    <div style={{ minWidth: "320px" }}>
      {!props.user && (
        <form method="POST" action="/" id="loginForm" onSubmit={login}>
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
          <button
            type="submit"
            className="button is-block is-primary is-fullwidth"
          >
            Log in
          </button>
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
