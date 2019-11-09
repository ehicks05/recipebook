import React from "react";

export default class Navbar extends React.Component {

    render() {

        const dockSidebarButton = !this.props.sidebarDocked ?
            <button className={'button is-hidden-touch'} onClick={() => this.props.onSetSidebarDocked(true)}>
                <i className="fas fa-bars" aria-hidden="true"> </i>
            </button>
            : null;

        const openSidebarButton = !this.props.sidebarOpen ?
            <button className={'button is-hidden-desktop'} onClick={() => this.props.onSetSidebarOpen(true)}>
                <i className="fas fa-bars" aria-hidden="true"> </i>
            </button>
            :
            <button className={'button is-hidden-desktop'} onClick={() => this.props.onSetSidebarOpen(false)}>
                <i className="fas fa-times" aria-hidden="true"> </i>
            </button>;

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                {dockSidebarButton}

                <div className={'container'}>
                    <div className="navbar-brand">
                        {openSidebarButton}
                        <a className="navbar-item" href="https://bulma.io">
                            {/*<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />*/}
                            <span className={'title'}><span role="img" aria-label="plate of food">🍛</span> Recipe Book</span>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}