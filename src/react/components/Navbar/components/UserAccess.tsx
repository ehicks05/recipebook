import React, { Dispatch, SetStateAction, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { IUser } from "../../../types/types";
import authFetch from "../../../authFetch";

interface IProps {
  user?: IUser;
  setUser: (user: IUser | undefined) => void
}

function UserAccess(props: IProps) {
  const [tab, setTab] = useState<string>("Login");
  const [accessMessage, setAccessMessage] = useState<string>("");

  function logout() {
    authFetch("/logout", undefined, false).then(() => {
      props.setUser(undefined);
    });
  }

  return (
    <>
      {!props.user && (
        <div className="tabs is-boxed">
          <ul>
            <li>
              <button
                className={`button ${tab === "Login" && "is-primary"}`}
                onClick={(e) => setTab(e.currentTarget.innerText)}
              >
                Login
              </button>
            </li>
            <li>
              <button
                className={`button ${tab === "Sign Up" && "is-primary"}`}
                onClick={(e) => setTab(e.currentTarget.innerText)}
              >
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}

      {accessMessage}

      {tab === "Login" ? (
        <LoginForm user={props.user} setUser={props.setUser} />
      ) : (
        <SignUpForm setAccessMessage={setAccessMessage} setTab={setTab} />
      )}

      {props.user && (
        <>
          Hi {props.user.displayName}
          <button className="button is-danger is-fullwidth" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </>
  );
}

export default UserAccess;
