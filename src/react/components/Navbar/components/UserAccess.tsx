import React, { Dispatch, SetStateAction, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { IUser } from "../../../types/types";

interface IProps {
  user?: IUser;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
}

function UserAccess(props: IProps) {
  const [tab, setTab] = useState<string>("Login");
  const [accessMessage, setAccessMessage] = useState<string>("");

  function logout() {
    fetch("/logout")
      .then((response) => response.text())
      .then(() => {
        props.setUser(undefined);
      });
  }

  return (
    <>
      {!props.user && (
        <div className="tabs is-boxed">
          <ul>
            <li className={tab === "Login" ? "is-active" : ""}>
              <a onClick={(e) => setTab(e.currentTarget.text)}>Login</a>
            </li>
            <li className={tab === "Sign Up" ? "is-active" : ""}>
              <a onClick={(e) => setTab(e.currentTarget.text)}>Sign Up</a>
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
          Hi {props.user.username}
          <button className="button is-danger is-fullwidth" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </>
  );
}

export default UserAccess;
