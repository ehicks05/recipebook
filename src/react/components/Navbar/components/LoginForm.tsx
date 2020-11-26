import React, { FormEvent, useCallback, useEffect, useState } from "react";
import authFetch from "../../../authFetch";
import { IUser } from "../../../types/types";

interface IProps {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
}

function LoginForm({ user, setUser }: IProps) {
  const [failureMessage, setFailureMessage] = useState<string>("");

  const fetchUser = useCallback(() => {
    authFetch("/me").then((json) => {
      if (json) setUser(json);
    });
  }, [setUser]);

  useEffect(fetchUser, [fetchUser]);

  function login(e: FormEvent) {
    e.preventDefault();
    const formElement = document.getElementById("loginForm") as HTMLFormElement;
    const formData = new FormData(formElement);

    setFailureMessage("");

    // @ts-ignore:
    authFetch(
      "/login",
      {
        method: "POST",
        body: new URLSearchParams(formData as any),
      },
      false
    ).then((response) => {
      if (response?.status !== 200)
        setFailureMessage("Invalid username and/or password");
      fetchUser();
    });
  }

  return (
    <div style={{ minWidth: "320px" }}>
      {!user && (
        <form method="POST" action="/" id="loginForm" onSubmit={login}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Email"
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

      {!user && failureMessage && (
        <>
          <div className="has-text-danger">{failureMessage}</div>
        </>
      )}
    </div>
  );
}

export default LoginForm;
