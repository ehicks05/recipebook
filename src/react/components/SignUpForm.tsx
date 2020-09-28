import React from "react";

function SignUpForm() {
  return (
    <div style={{ minWidth: "220px" }}>
      <form method="POST">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Email"
              autoFocus
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
      </form>
    </div>
  );
}

export default SignUpForm;
