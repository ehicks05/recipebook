import React from "react";

export default class Navbar extends React.Component {

    render() {

        const menuButton = !this.props.sidebarDocked ?
            <a className={'button is-hidden-touch'} onClick={() => this.props.onSetSidebarDocked(true)}>
                <i className="fas fa-bars" aria-hidden="true"> </i>
            </a>
            : null;

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                {menuButton}

                <div className={'container'}>
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            {/*<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />*/}
                            <span className={'title'}>🍛 Recipe Book</span>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}