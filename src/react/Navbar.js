import React, {useEffect} from "react";

function Navbar(props) {
    useEffect(() => {
        wireUpHamburgers();
    }, []);

    function wireUpHamburgers()
    {
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach( el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }
    }

    const dockSidebarButton = !props.sidebarDocked ?
        <button className={'button bigger-burger has-text-grey is-hidden-touch'} style={{border: 'none', position: 'absolute'}} onClick={() => props.onSetSidebarDocked(true)}>
            <i className="icon-bars" aria-hidden="true"> </i>
        </button>
        : null;

    const isSetOpen = !props.sidebarOpen;
    const icon = props.sidebarOpen ? 'icon-arrow-left' : 'icon-bars';

    const openSidebarButton =
        <button className={'button bigger-burger has-text-grey is-hidden-desktop'} style={{border: 'none'}} onClick={() => props.onSetSidebarOpen(isSetOpen)}>
            <i className={icon} aria-hidden="true"> </i>
        </button>;

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            {dockSidebarButton}

            <div className={'container'}>
                <div className="navbar-brand">
                    {openSidebarButton}
                    <a className="navbar-item" href="#">
                        <span className={'title'}>
                            {/*<span role="img" aria-label="plate of food">🍛</span> Recipe Book*/}
                            <img src='/logo-via-logohub.png' />
                        </span>
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className="navbar-menu" id='navbarBasicExample'>
                    <div className="navbar-start">
                    </div>

                    <div className="navbar-end">
                        {/*<div className="navbar-item">*/}
                        {/*    <div className="buttons">*/}
                        {/*        <a className="button is-primary">*/}
                        {/*            <strong>Sign up</strong>*/}
                        {/*        </a>*/}
                        {/*        <a className="button is-light" onClick={toggleShowLoginForm}>*/}
                        {/*            Log in*/}
                        {/*        </a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                {props.user ? 'Account' : 'Log In'}
                            </a>

                            <div className="navbar-dropdown is-right" >
                                <div className="navbar-item">
                                    <LoginForm user={props.user} setUser={props.setUser} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function LoginForm(props) {
    useEffect(() => {
        fetchUser();
    }, []);

    function fetchUser() {
        fetch("/user")
            .then(response => response.json())
            .then(json => {console.log(json); props.setUser(json)});
    }

    function login() {
        const formData = new FormData(document.getElementById('loginForm'));

        fetch('/login', {method: 'POST', body: new URLSearchParams(formData)})
            .then(response => response.text())
            .then(text => {console.log(text); fetchUser()});
    }

    function logout() {
        fetch("/logout")
            .then(response => response.text())
            .then(text => {console.log(text); props.setUser(null)});
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

export default Navbar;