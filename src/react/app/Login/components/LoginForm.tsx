import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MdLock, MdMail } from 'react-icons/md';
import authFetch from '../../../authFetch';
import Button from '../../../components/Button';
import { Input } from '../../../components/FormikInput';
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
        <div className="flex flex-col gap-1">
          <Input
            type="email"
            placeholder="Username"
            autoComplete="email"
            value={formState.username}
            onChange={e =>
              setFormState({ ...formState, username: e.currentTarget.value })
            }
            LeftIcon={MdMail}
          />

          <Input
            type="password"
            placeholder="Password"
            autoComplete="password"
            value={formState.password}
            onChange={e =>
              setFormState({ ...formState, password: e.currentTarget.value })
            }
            LeftIcon={MdLock}
          />
          <Button
            onClick={() => login()}
            className="mt-4 bg-green-500 text-white"
          >
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
