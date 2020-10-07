import React, { Dispatch, SetStateAction, useEffect } from "react";
import UserAccess from "./components/UserAccess";
import { Link } from "react-router-dom";
import { IUser } from "./components/types";

interface IProps {
  sidebarOpen: boolean;
  onSetSidebarOpen: (isSetOpen: boolean) => void;
  sidebarDocked: boolean;
  onSetSidebarDocked: (isSetDocked: boolean) => void;
  user?: IUser;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
}

function Navbar(props: IProps) {
  useEffect(() => {
    wireUpHamburgers();
  }, []);

  function wireUpHamburgers() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          if ($target) $target.classList.toggle("is-active");
        });
      });
    }
  }

  const dockSidebarButton = !props.sidebarDocked ? (
    <button
      className={"button bigger-burger is-hidden-touch"}
      style={{ border: "none", position: "absolute", backgroundColor: 'transparent' }}
      onClick={() => props.onSetSidebarDocked(true)}
    >
      <i className="icon-bars" aria-hidden="true">
        {" "}
      </i>
    </button>
  ) : null;

  const isSetOpen = !props.sidebarOpen;
  const icon = props.sidebarOpen ? "icon-arrow-left" : "icon-bars";

  const openSidebarButton = (
    <button
      className={"button bigger-burger is-hidden-desktop"}
      style={{ border: "none", backgroundColor: 'transparent' }}
      onClick={() => props.onSetSidebarOpen(isSetOpen)}
    >
      <i className={icon} aria-hidden="true">
        {" "}
      </i>
    </button>
  );

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {dockSidebarButton}

      <div className={"container"}>
        <div className="navbar-brand">
          {openSidebarButton}
          <div className="navbar-item">
            <span className={"title"} style={{fontFamily: '\'Architects Daughter\''}}>
              <Link to="/">
                Recipe Book
              </Link>
            </span>
          </div>

          <div
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div className="navbar-menu" id="navbarBasicExample">
          <div className="navbar-start"></div>

          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                {props.user ? (
                  <Link to="/myAccount">My Account</Link>
                ) : (
                  "Log In"
                )}
              </div>

              <div className="navbar-dropdown is-right">
                <div className="navbar-item">
                  <UserAccess user={props.user} setUser={props.setUser} />
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
