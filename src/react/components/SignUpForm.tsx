import React, { useState } from "react";

interface IErrorMessage {
  firstNameMessage: string;
  lastNameMessage: string;
  emailMessage: string;
  passwordMessage: string;
}

function SignUpForm() {
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<IErrorMessage>({
    firstNameMessage: "",
    lastNameMessage: "",
    emailMessage: "",
    passwordMessage: "",
  });

  function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const enteredValue = e.target.value;
    const emailPattern = /[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*/;

    // if (enteredValue.length === 0)
    //   setErrorMessages((prev) => {
    //     return { ...prev, emailMessage = "" };
    //   });
    // else if (emailPattern[Symbol.search](enteredValue) === -1)
    //   setEmailMessage("not a valid email");
    // else setEmailMessage("");
  }

  function validatePasswords() {
    // @ts-ignore
    const password1 = document.getElementById("password").value;
    // @ts-ignore
    const password2 = document.getElementById("passwordCheck").value;

    if (password1.length > 0 && password2.length > 0 && password1 != password2)
      setPasswordMessage("Passwords must match");
    else setPasswordMessage("");
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

        <div className="has-text-danger">{emailMessage}</div>

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

        <div className="has-text-danger">{passwordMessage}</div>

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
