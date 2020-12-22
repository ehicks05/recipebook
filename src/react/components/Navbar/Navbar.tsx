import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import authFetch from '../../authFetch';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();

  const handleClickNavbarItem = (e: React.MouseEvent<HTMLElement>) => {
    setIsActive(!isActive);
    (e.target as HTMLElement).blur();
  };

  function logout() {
    authFetch('/logout', undefined, false).then(() => {
      setUser(undefined);
      history.push('/');
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
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>

        <div
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
          id="navbarBasicExample"
        >
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
                  <Link
                    className="navbar-item"
                    to="/myAccount"
                    onClick={handleClickNavbarItem}
                  >
                    My Account
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/create-recipe"
                    onClick={handleClickNavbarItem}
                  >
                    Create a Recipe
                  </Link>
                  <hr className="navbar-divider" />
                  <a
                    className="navbar-item"
                    onClick={e => {
                      logout();
                      handleClickNavbarItem(e);
                    }}
                  >
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
