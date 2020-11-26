import React, { useReducer } from "react";
import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
import authFetch from "../../../authFetch";

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
    const emailInput = document.getElementById("email");
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

    if (password1.length > 0 && password2.length > 0 && password1 !== password2)
      dispatch({ key: "password", value: "passwords do not match" });
    else dispatch({ key: "password", value: "" });
  }

  function isFormDataValid(formData: FormData): boolean {
    if (errorMessageState.passwordMessage) return false;
    if (errorMessageState.emailMessage) return false;

    const reqs = document
      .getElementById("signUpForm")
      ?.querySelectorAll("[required]");
    let valid = true;

    reqs?.forEach((element) => {
      const id = element.id;
      const formValue = formData.get(id) as string;
      if (!formValue || formValue.length === 0) {
        element.classList.add("is-danger");
        valid = false;
      }
    });

    return valid;
  }

  async function signUp(e: React.FormEvent) {
    e.preventDefault();

    const formElement = document.getElementById(
      "signUpForm"
    ) as HTMLFormElement;
    const formData = new FormData(formElement);

    if (!isFormDataValid(formData)) return;

    authFetch(
      "/user",
      {
        method: "POST",
        body: new URLSearchParams(formData as any),
      },
      false
    )
      .then((response) => {
        if (response.ok) return response.json();
        return response.text().then((text: any) => {
          throw new Error(text);
        });
      })
      .then(() => {
        props.setAccessMessage("Account successfully created");
        props.setTab("Login");
      })
      .catch((reason) => {
        props.setAccessMessage(reason.message);
      });
  }

  return (
    <div style={{ minWidth: "320px" }}>
      <form method="POST" id="signUpForm" onSubmit={signUp}>
        {/*USERNAME*/}
        <div className="field">
          <div className="field has-addons">
            <p className="control is-expanded">
              <input
                className="input"
                type="email"
                placeholder="Username"
                id="username"
                name="username"
                required={true}
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

        {/*EMAIL*/}
        <div className="field">
          <div className="field has-addons">
            <p className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Display Name"
                id="displayName"
                name="displayName"
                required={true}
              />
            </p>
            <p className="control">
              <button
                tabIndex={-1}
                type="button"
                className="button has-tooltip-left"
                data-tooltip="This is how you will be known on the site"
              >
                ?
              </button>
            </p>
          </div>
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
              required={true}
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
                required={true}
              />
            </p>
          </div>
          <p className="help has-text-danger">
            {errorMessageState.passwordMessage}
          </p>
        </div>

        <button
          type="submit"
          value="Sign Up"
          className="button is-block is-primary is-fullwidth"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
