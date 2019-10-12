import React from "react";

export default class Navbar extends React.Component {

    render() {

        const dockSidebarButton = !this.props.sidebarDocked ?
            <a className={'button is-hidden-touch'} onClick={() => this.props.onSetSidebarDocked(true)}>
                <i className="fas fa-bars" aria-hidden="true"> </i>
            </a>
            : null;

        const openSidebarButton = !this.props.sidebarOpen ?
            <a className={'button is-hidden-desktop'} onClick={() => this.props.onSetSidebarOpen(true)}>
                <i className="fas fa-bars" aria-hidden="true"> </i>
            </a>
            :
            <a className={'button is-hidden-desktop'} onClick={() => this.props.onSetSidebarOpen(false)}>
                <i className="fas fa-times" aria-hidden="true"> </i>
            </a>;

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                {dockSidebarButton}

                <div className={'container'}>
                    <div className="navbar-brand">
                        {openSidebarButton}
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