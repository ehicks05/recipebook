import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/all';
import UserAccess from './components/UserAccess';
import { UserContext } from '../../UserContext';

const clickBurger = (e: React.MouseEvent<HTMLDivElement>) => {
  (e.target as HTMLDivElement).classList.toggle('is-active');
  document.getElementById('navbarBasicExample')?.classList.toggle('is-active');
};

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <span className="title" style={{ fontFamily: "'Ubuntu Light'" }}>
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
            <div className="navbar-item has-dropdown is-hoverable">
              <UserContext.Consumer>
                {({ user, setUser }) => (
                  <>
                    <div className="navbar-link">
                      {user ? <Link to="/myAccount">My Account</Link> : 'Log In'}
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
