import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import authFetch from '../../authFetch';

const clickBurger = (e: React.MouseEvent<HTMLDivElement>) => {
  (e.target as HTMLDivElement).classList.toggle('is-active');
  document.getElementById('navbarBasicExample')?.classList.toggle('is-active');
};

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  function logout() {
    authFetch('/logout', undefined, false).then(() => {
      setUser(undefined);
    });
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <span className="title">
              <Link to="/">
                <img className="image" src="/logo.png" alt="logo" />
              </Link>
            </span>
          </div>

          <div
            role="button"
            tabIndex={0}
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={clickBurger}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>

        <div className="navbar-menu" id="navbarBasicExample">
          <div className="navbar-start" />

          <div className="navbar-end">
            {!user && (
              <Link className="navbar-item" to="/login">
                Log In
              </Link>
            )}
            {user && (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-item">Menu</div>

                <div className="navbar-dropdown is-right is-boxed">
                  <Link className="navbar-item" to="/myAccount">
                    My Account
                  </Link>
                  <Link className="navbar-item" to="/create-recipe">
                    Create a Recipe
                  </Link>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" onClick={logout}>
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
