import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { UserContext } from '../../UserContext';
import Container from '../../components/Container';
import Card from '../../components/Card';

export type AUTH_TAB = 'LOG_IN' | 'SIGN_UP';

function UserAccess() {
  const [selectedTab, setSelectedTab] = useState<AUTH_TAB>('LOG_IN');
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
      component: (
        <SignUpForm
          setAccessMessage={setAccessMessage}
          setSelectedTab={setSelectedTab}
        />
      ),
    },
  };

  if (user) return <Redirect to="/" />;

  return (
    <Container>
      <div className="w-96 mx-auto">
        <Card>
          <div className="mb-4 text-xl font-semibold text-center">
            {TABS[selectedTab].title}
          </div>
          {!user && (
            <div className="flex gap-4 mb-4">
              {Object.entries(TABS).map(([id, tab]) => {
                return (
                  <a
                    className={`cursor-pointer ${
                      id === selectedTab ? 'border-b-2  border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedTab(id as AUTH_TAB)}
                  >
                    {tab.name}
                  </a>
                );
              })}
            </div>
          )}

          {accessMessage}

          {TABS[selectedTab].component}
        </Card>
      </div>
    </Container>
  );
}

export default UserAccess;
