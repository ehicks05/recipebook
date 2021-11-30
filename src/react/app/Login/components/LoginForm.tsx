import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { FaEnvelope, FaLock } from 'react-icons/all';
import authFetch from '../../../authFetch';
import Button from '../../../components/Button';
import { UserContext } from '../../../UserContext';

function LoginForm() {
  const { user, setUser } = useContext(UserContext);
  const [failureMessage, setFailureMessage] = useState<string>('');
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const fetchUser = useCallback(() => {
    authFetch('/me').then(json => {
      if (json) setUser(json);
    });
  }, [setUser]);

  useEffect(fetchUser, [fetchUser]);

  function login() {
    setFailureMessage('');

    authFetch(
      '/login',
      {
        method: 'POST',
        body: new URLSearchParams(formState),
      },
      false
    ).then(response => {
      if (response?.status !== 200) {
        setFailureMessage('Invalid username and/or password');
      }
      fetchUser();
    });
  }

  return (
    <div>
      {!user && (
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Username"
            value={formState.username}
            onChange={e =>
              setFormState({ ...formState, username: e.currentTarget.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="password"
            value={formState.password}
            onChange={e =>
              setFormState({ ...formState, password: e.currentTarget.value })
            }
          />
          <Button onClick={() => login()} className="bg-green-500 text-white">
            Log in
          </Button>
        </div>
      )}

      {!user && failureMessage && (
        <div className="has-text-danger">{failureMessage}</div>
      )}
    </div>
  );
}

export default LoginForm;
