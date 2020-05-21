import React from "react";

function Navbar(props) {

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
                        <span className={'title'}><span role="img" aria-label="plate of food">🍛</span> Recipe Book</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;