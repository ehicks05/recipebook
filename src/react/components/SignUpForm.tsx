import React, { useReducer } from "react";

interface IErrorMessage {
  emailMessage: string;
  passwordMessage: string;
}

interface IProps {
  setTab: (tab: string, message?: string | undefined) => void;
}

function SignUpForm(props: IProps) {
  function reducer(
    state: IErrorMessage,
    action: { key: string; value: string }
  ): IErrorMessage {
    switch (action.key) {
      case "email":
        return { ...state, emailMessage: action.value };
      case "password":
        return { ...state, passwordMessage: action.value };
      default:
        return state;
    }
  }

  const [errorMessageState, dispatch] = useReducer(reducer, {
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

  async function signUp() {
    if (errorMessageState.passwordMessage) return;
    if (errorMessageState.emailMessage) return;

    const formElement = document.getElementById(
      "signUpForm"
    ) as HTMLFormElement;
    const formData = new FormData(formElement);

    const email = formData.get("username") as string;
    const password = formData.get("password") as string;
    const passwordCheck = formData.get("passwordCheck") as string;

    if (!email || email.length === 0) return;
    if (!password || password.length === 0) return;
    if (!passwordCheck || passwordCheck.length === 0) return;

    fetch("/user", {
      method: "POST",
      body: new URLSearchParams(formData as any),
    })
      .then(async (response) => {
        console.log(response);
        if (response.ok) return response.json();
        else
          await response.json().then((text) => {
            throw Error(text.message);
          });
      })
      .then((_) => {
        props.setTab("Login", "Account successfully created");
      })
      .catch((reason) => {
        console.log(reason.message);
        props.setTab("Sign Up", reason.message);
      });
  }

  return (
    <div style={{ minWidth: "320px" }}>
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
              placeholder="Please reenter your password"
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
