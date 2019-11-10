import React from "react";

export default class Navbar extends React.Component {

    render() {

        const dockSidebarButton = !this.props.sidebarDocked ?
            <button className={'button bigger-burger is-hidden-touch'} onClick={() => this.props.onSetSidebarDocked(true)}>
                <i className="fas fa-bars" aria-hidden="true"> </i>
            </button>
            : null;

        const isSetOpen = !this.props.sidebarOpen;
        const icon = this.props.sidebarOpen ? 'fa-times' : 'fa-bars';

        const openSidebarButton =
            <button className={'button bigger-burger is-hidden-desktop'} onClick={() => this.props.onSetSidebarOpen(isSetOpen)}>
                <i className={"fas " + icon} aria-hidden="true"> </i>
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