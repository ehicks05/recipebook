import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../types/types";
import UserAccess from "./components/UserAccess";
import { FaPlus } from "react-icons/all";
import { UserContext } from "../../UserContext";

function Navbar() {
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

  return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className={"container"}>
          <div className="navbar-brand">
            <div className="navbar-item">
            <span className={"title"} style={{ fontFamily: "'Ubuntu Light'" }}>
              <Link className="has-text-grey-light" to="/">
                <img className="image" src="/logo.png" alt="logo" />
              </Link>
            </span>
            </div>
            <div className="navbar-item">
              <Link to="/create-recipe">
                <button className="button is-primary is-small">
                <span className="icon">
                  <FaPlus />
                </span>
                </button>
              </Link>
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
                <UserContext.Consumer>
                  {({user, setUser}) => (
                      <>
                        <div className="navbar-link">
                          {user ? (
                              <Link to="/myAccount">My Account</Link>
                          ) : (
                              "Log In"
                          )}
                        </div>

                        <div className="navbar-dropdown is-right">
                          <div className="navbar-item">
                            <div>
                              <UserAccess user={user} setUser={setUser} />
                            </div>
                          </div>
                        </div>
                      </>
                  )}
                </UserContext.Consumer>
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
