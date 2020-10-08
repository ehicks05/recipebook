import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { IUser } from "./types";

interface IProps {
  user?: IUser;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
}

function UserAccess(props: IProps) {
  const [tab, setTab] = useState<string>("Login");
  const [accessMessage, setAccessMessage] = useState<string>("");

  function setTabName(tabName: string, message?: string | undefined) {
    if (message) setAccessMessage(message);
    else setAccessMessage("");
    setTab(tabName);
  }

  function logout() {
    fetch("/logout")
      .then((response) => response.text())
      .then(() => {
        props.setUser(undefined);
      });
  }

  function getGreetingAddress(): string {
    let greeting = props.user?.email ? props.user.email : "";

    if (props.user?.firstName) {
      if (props.user.lastName)
        greeting = props.user.firstName + " " + props.user.lastName;
      else greeting = props.user.firstName;
    }

    return greeting;
  }

  return (
    <>
      {!props.user && (
        <div className="tabs is-boxed">
          <ul>
            <li className={tab === "Login" ? "is-active" : ""}>
              <a onClick={(e) => setTabName(e.currentTarget.text)}>Login</a>
            </li>
            <li className={tab === "Sign Up" ? "is-active" : ""}>
              <a onClick={(e) => setTabName(e.currentTarget.text)}>Sign Up</a>
            </li>
          </ul>
        </div>
      )}

      {tab === "Login" ? (
        <LoginForm
          message={accessMessage}
          user={props.user}
          setUser={props.setUser}
        />
      ) : (
        <SignUpForm setTab={setTabName} />
      )}

      {props.user && (
        <>
          Hi {getGreetingAddress()}
          <button className="button is-danger is-fullwidth" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </>
  );
}

export default UserAccess;
