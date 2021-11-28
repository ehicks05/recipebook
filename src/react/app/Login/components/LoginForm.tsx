import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
// import { FaEnvelope, FaLock } from 'react-icons/all';
import authFetch from '../../../authFetch';
import Button from '../../../components/Button';
import { UserContext } from '../../../UserContext';

function LoginForm() {
  const { user, setUser } = useContext(UserContext);
  const [failureMessage, setFailureMessage] = useState<string>('');

  const fetchUser = useCallback(() => {
    authFetch('/me').then(json => {
      if (json) setUser(json);
    });
  }, [setUser]);

  useEffect(fetchUser, [fetchUser]);

  function login(e: FormEvent) {
    e.preventDefault();
    const formElement = document.getElementById('loginForm') as HTMLFormElement;
    const formData = new FormData(formElement);

    setFailureMessage('');

    authFetch(
      '/login',
      {
        method: 'POST',
        body: new URLSearchParams(formData as any),
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
        <form method="POST" action="/" id="loginForm" onSubmit={login}>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="email"
                placeholder="Username"
                id="username"
                name="username"
              />
              {/* <span className="icon is-left">
                <FaEnvelope />
              </span> */}
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                autoComplete="password"
              />
              {/* <span className="icon is-left">
                <FaLock />
              </span> */}
            </div>
          </div>
          <Button type="submit" className="bg-green-500 text-white">
            Log in
          </Button>
        </form>
      )}

      {!user && failureMessage && (
        <div className="has-text-danger">{failureMessage}</div>
      )}
    </div>
  );
}

export default LoginForm;
