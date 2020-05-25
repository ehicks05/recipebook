import React, {useEffect} from "react";
import authFetch from "./authFetch";

function LoginForm(props) {
    useEffect(fetchUser, []);

    function fetchUser() {
        authFetch("/user")
            .then(json => {if (json) props.setUser(json)});
    }

    function login() {
        const formData = new FormData(document.getElementById('loginForm'));

        fetch('/login', {method: 'POST', body: new URLSearchParams(formData)})
            .then(response => response.text())
            .then(text => {fetchUser()});
    }

    function logout() {
        fetch("/logout")
            .then(response => response.text())
            .then(text => {props.setUser(null)});
    }

    return (
        <div style={{minWidth: '220px'}}>
            {
                !props.user &&
                <form method="POST" action="/" id="loginForm">
                    <div className="field">
                        <div className="control">
                            <input className="input" type="email" placeholder="Email" autoFocus="" id="username" name="username"/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" id="password" name="password"/>
                        </div>
                    </div>
                    <input type="button" value="Log in" className="button is-block is-primary is-fullwidth" onClick={login}/>
                </form>
            }
            {
                props.user &&
                <>Hi {props.user.fullName}! <button className='button is-danger is-fullwidth' onClick={logout}>Logout</button></>
            }
        </div>
    );
}

export default LoginForm;