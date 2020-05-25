import React, {useEffect} from "react";
import LoginForm from "./LoginForm";

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
                    <div className="navbar-item" href="#">
                        <span className={'title'}>
                            {/*<span role="img" aria-label="plate of food">🍛</span> Recipe Book*/}
                            <img src='/logo-via-logohub.png' alt='Recipe Book Site Logo' />
                        </span>
                    </div>

                    <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
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
                            <div className="navbar-link">
                                {props.user ? 'Account' : 'Log In'}
                            </div>

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

export default Navbar;