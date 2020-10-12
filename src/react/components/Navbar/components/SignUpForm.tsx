import React, { useReducer } from "react";
import apiUrl from "../../../api";
import "../../../../../node_modules/@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";

interface IErrorMessage {
  emailMessage: string;
  passwordMessage: string;
}

interface IProps {
  setTab: (tab: string) => void;
  setAccessMessage: (message: string) => void;
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
    const emailInput = document.getElementById("username");
    emailInput?.classList.remove("is-danger");

    const enteredValue = e.target.value;
    const emailPattern = /[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*/;

    if (emailPattern[Symbol.search](enteredValue) === -1)
      dispatch({ key: "email", value: "not a valid email" });
    else dispatch({ key: "email", value: "" });
  }

  function validatePasswords() {
    const passwordInput = document.getElementById("password");
    passwordInput?.classList.remove("is-danger");
    const passwordCheckInput = document.getElementById("passwordCheck");
    passwordCheckInput?.classList.remove("is-danger");

    // @ts-ignore
    const password1 = document.getElementById("password").value;
    // @ts-ignore
    const password2 = document.getElementById("passwordCheck").value;

    if (password1.length > 0 && password2.length > 0 && password1 != password2)
      dispatch({ key: "password", value: "passwords do not match" });
    else dispatch({ key: "password", value: "" });
  }

  function isFormDataValid(formData: FormData): boolean {
    if (errorMessageState.passwordMessage) return false;
    if (errorMessageState.emailMessage) return false;

    const email = formData.get("username") as string;
    const password = formData.get("password") as string;
    const passwordCheck = formData.get("passwordCheck") as string;

    let fail = false;

    if (!email || email.length === 0) {
      const emailInput = document.getElementById("username");
      emailInput?.classList.add("is-danger");
      fail = true;
    }
    if (!password || password.length === 0) {
      const passwordInput = document.getElementById("password");
      passwordInput?.classList.add("is-danger");
      fail = true;
    }
    if (!passwordCheck || passwordCheck.length === 0) {
      const passwordCheckInput = document.getElementById("passwordCheck");
      passwordCheckInput?.classList.add("is-danger");
      fail = true;
    }

    if (fail) return false;
    return true;
  }

  async function signUp() {
    const formElement = document.getElementById(
      "signUpForm"
    ) as HTMLFormElement;
    const formData = new FormData(formElement);

    if (!isFormDataValid(formData)) return;

    fetch(apiUrl + "/user", {
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
        props.setAccessMessage("Account successfully created");
        props.setTab("Login");
      })
      .catch((reason) => {
        console.log(reason.message);
        props.setAccessMessage(reason.message);
      });
  }

  return (
    <div style={{ minWidth: "320px" }}>
      <form method="POST" id="signUpForm">
        {/*FIRST NAME*/}
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

        {/*LAST NAME*/}
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

        {/*EMAIL*/}
        <div className="field">
          <div className="field has-addons">
            <p className="control is-expanded">
              <input
                className="input"
                type="email"
                placeholder="Email"
                id="username"
                name="username"
                onChange={validateEmail}
              />
            </p>
            <p className="control">
              <button
                tabIndex={-1}
                type="button"
                className="button has-tooltip-left"
                data-tooltip="This will be your login"
              >
                ?
              </button>
            </p>
          </div>
          <p className="help has-text-danger">
            {errorMessageState.emailMessage}
          </p>
        </div>

        {/*PASSWORD*/}
        <div className="field has-addons">
          <p className="control is-expanded">
            <input
              className="input"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={validatePasswords}
            />
          </p>
          <p className="control">
            <button
              tabIndex={-1}
              type="button"
              className="button has-tooltip-left"
              data-tooltip="Enter a valid password"
            >
              ?
            </button>
          </p>
        </div>

        {/*PASSWORD CHECK*/}
        <div className="field">
          <div className="field has-addons">
            <p className="control is-expanded">
              <input
                className="input"
                type="password"
                placeholder="Please reenter your password"
                id="passwordCheck"
                name="passwordCheck"
                onChange={validatePasswords}
              />
            </p>
          </div>
          <p className="help has-text-danger">
            {errorMessageState.passwordMessage}
          </p>
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
