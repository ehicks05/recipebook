import React, { Reducer, useReducer, useState } from "react";

interface IErrorMessage {
  firstNameMessage: string;
  lastNameMessage: string;
  emailMessage: string;
  passwordMessage: string;
}

function SignUpForm() {
  function reducer(
    state: IErrorMessage,
    action: { key: string; value: string }
  ): IErrorMessage {
    console.log(action);

    switch (action.key) {
      case "firstName":
        return { ...state, firstNameMessage: action.value };
      case "lastName":
        return { ...state, lastNameMessage: action.value };
      case "email":
        return { ...state, emailMessage: action.value };
      case "password":
        return { ...state, passwordMessage: action.value };
      default:
        return state;
    }
  }

  const [errorMessageState, dispatch] = useReducer(reducer, {
    firstNameMessage: "",
    lastNameMessage: "",
    emailMessage: "",
    passwordMessage: "",
  });

  function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const enteredValue = e.target.value;
    const emailPattern = /[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*/;

    if (enteredValue.length === 0)
      dispatch({ key: "email", value: "please enter an email address" });
    else if (emailPattern[Symbol.search](enteredValue) === -1)
      dispatch({ key: "email", value: "not a valid email" });
    else dispatch({ key: "email", value: "" });
  }

  function validatePasswords() {
    // @ts-ignore
    const password1 = document.getElementById("password").value;
    // @ts-ignore
    const password2 = document.getElementById("passwordCheck").value;

    if (password1.length > 0 && password2.length > 0 && password1 != password2)
      dispatch({ key: "password", value: "passwords do not match" });
    else dispatch({ key: "password", value: "" });
  }

  function signUp() {
    const formElement = document.getElementById(
      "signUpForm"
    ) as HTMLFormElement;
    const formData = new FormData(formElement);

    fetch("/user", {
      method: "POST",
      body: new URLSearchParams(formData as any),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div style={{ minWidth: "220px" }}>
      <form method="POST" id="signUpForm">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              autoFocus
              placeholder="First Name"
              id="firstName"
              name="firstName"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Email"
              id="username"
              name="username"
              onChange={validateEmail}
            />
          </div>
        </div>
        <div className="has-text-danger">{errorMessageState.emailMessage}</div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={validatePasswords}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Please enter your password again"
              id="passwordCheck"
              name="passwordCheck"
              onChange={validatePasswords}
            />
          </div>
        </div>
        <div className="has-text-danger">
          {errorMessageState.passwordMessage}
        </div>
        <input
          type="button"
          value="Sign Up"
          className="button is-block is-primary is-fullwidth"
          onClick={signUp}
        />
      </form>
    </div>
  );
}

export default SignUpForm;
