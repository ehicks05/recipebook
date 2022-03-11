import React, { useReducer, useState } from 'react';
import { MdLock, MdMail, MdPerson } from 'react-icons/md';
import authFetch from '../../../authFetch';
import Button from '../../../components/Button';
import { Input } from '../../../components/FormikInput';
import { AUTH_TAB } from '../UserAccess';

interface IErrorMessage {
  emailMessage: string;
  passwordMessage: string;
}

interface IProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<AUTH_TAB>>;
  setAccessMessage: React.Dispatch<React.SetStateAction<string>>;
}

function SignUpForm({ setSelectedTab, setAccessMessage }: IProps) {
  const [formState, setFormState] = useState({
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
  });

  function reducer(
    state: IErrorMessage,
    action: { key: string; value: string }
  ): IErrorMessage {
    switch (action.key) {
      case 'email':
        return { ...state, emailMessage: action.value };
      case 'password':
        return { ...state, passwordMessage: action.value };
      default:
        return state;
    }
  }

  const [errorMessageState, dispatch] = useReducer(reducer, {
    emailMessage: '',
    passwordMessage: '',
  });

  function validateEmail() {
    const emailPattern = /[a-zA-Z0-9]*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*/;
    if (emailPattern[Symbol.search](formState.email) === -1) {
      dispatch({ key: 'email', value: 'not a valid email' });
    } else dispatch({ key: 'email', value: '' });
  }

  function validatePasswords() {
    const { password, confirmPassword } = formState;
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password !== confirmPassword
    ) {
      dispatch({ key: 'password', value: 'passwords do not match' });
    } else dispatch({ key: 'password', value: '' });
  }

  function isFormDataValid(): boolean {
    if (errorMessageState.passwordMessage) return false;
    if (errorMessageState.emailMessage) return false;

    return Object.values(formState).every(v => v.length > 0);
  }

  async function signUp() {
    if (!isFormDataValid()) return;

    authFetch(
      '/user',
      {
        method: 'POST',
        body: new URLSearchParams(formState),
      },
      false
    )
      .then(response => {
        if (response.ok) return response.json();
        return response.text().then((text: string) => {
          throw new Error(text);
        });
      })
      .then(() => {
        setAccessMessage('Account successfully created');
        setSelectedTab('LOG_IN');
      })
      .catch(reason => {
        setAccessMessage(reason.message);
      });
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        <Input
          type="email"
          placeholder="Username"
          onChange={e => {
            setFormState({ ...formState, email: e.currentTarget.value });
            validateEmail();
          }}
          LeftIcon={MdMail}
        />
        <Button tabIndex={-1} className="" title="This will be your login">
          ?
        </Button>
      </div>

      <div className="flex">
        <Input
          type="text"
          placeholder="Display Name"
          onChange={e => {
            setFormState({ ...formState, displayName: e.currentTarget.value });
          }}
          LeftIcon={MdPerson}
        />
        <Button tabIndex={-1} title="This is how you will be known on the site">
          ?
        </Button>
      </div>

      <div className="flex">
        <Input
          type="password"
          placeholder="Password"
          onChange={e => {
            setFormState({ ...formState, password: e.currentTarget.value });
            validatePasswords();
          }}
          LeftIcon={MdLock}
        />
      </div>

      <div className="flex">
        <Input
          type="password"
          placeholder="Confirm password"
          onChange={e => {
            setFormState({
              ...formState,
              confirmPassword: e.currentTarget.value,
            });
            validatePasswords();
          }}
          LeftIcon={MdLock}
        />
        <p className="text-red-500">{errorMessageState.passwordMessage}</p>
      </div>

      <Button onClick={() => signUp()} className="mt-4 bg-green-500 text-white">
        Sign Up
      </Button>
    </div>
  );
}

export default SignUpForm;
