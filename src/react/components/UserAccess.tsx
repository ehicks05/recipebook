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

  function setTabName(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    // @ts-ignore
    const tab = e.currentTarget.text;
    setTab(tab);
    console.log(tab);
  }

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
              <a onClick={setTabName}>Login</a>
            </li>
            <li className={tab === "Sign Up" ? "is-active" : ""}>
              <a onClick={setTabName}>Sign Up</a>
            </li>K
          </ul>
        </div>
      )}

      {tab === "Login" ? (
        <LoginForm user={props.user} setUser={props.setUser} />
      ) : (
        <SignUpForm />
      )}

      {props.user && (
        <>
          Hi {props.user.fullName}!{" "}
          <button className="button is-danger is-fullwidth" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </>
  );
}

export default UserAccess;
