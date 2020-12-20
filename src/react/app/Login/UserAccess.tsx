import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { UserContext } from '../../UserContext';

function UserAccess() {
  const [tab, setTab] = useState<string>('Log In');
  const [accessMessage, setAccessMessage] = useState<string>('');
  const { user } = useContext(UserContext);

  const TABS = {
    LOG_IN: {
      name: 'Log In',
      title: 'Log in to RecipeBook',
      component: <LoginForm />,
    },
    SIGN_UP: {
      name: 'Sign Up',
      title: 'Create an account',
      component: <SignUpForm setAccessMessage={setAccessMessage} setTab={setTab} />,
    },
  };

  if (user) return <Redirect to="/" />;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '20rem' }}>
        <p className="title has-text-centered">
          {tab === TABS.LOG_IN.name ? TABS.LOG_IN.title : TABS.SIGN_UP.title}
        </p>
        <div className="box">
          {!user && (
            <div className="tabs">
              <ul>
                <li className={tab === TABS.LOG_IN.name ? 'is-active' : ''}>
                  <a onClick={e => setTab(e.currentTarget.innerText)}>Log In</a>
                </li>
                <li className={tab === TABS.SIGN_UP.name ? 'is-active' : ''}>
                  <a onClick={e => setTab(e.currentTarget.innerText)}>Sign Up</a>
                </li>
              </ul>
            </div>
          )}

          {accessMessage}

          {tab === TABS.LOG_IN.name ? TABS.LOG_IN.component : TABS.SIGN_UP.component}
        </div>
      </div>
    </section>
  );
}

export default UserAccess;
