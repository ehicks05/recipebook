import { Dialog } from '@headlessui/react';
import React from 'react';
import { Auth, ThemeSupa, ThemeMinimal } from '@supabase/auth-ui-react';
import useUser from 'hooks/useUser';
import { Button, T } from 'core-components';
import { supabase } from '../helpers/supabase';

const Container: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <T>Welcome {user.email}!</T>
        </div>

        <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
    );
  }
  return children;
};

interface AuthDialogProps {
  isOpen: boolean;
  hideModal: () => void;
}

const AuthDialog = ({ isOpen, hideModal }: AuthDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={hideModal}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="z-20 bg-stone-900 rounded max-w-sm mx-auto">
          <div className="py-8 px-4 max-w-sm mx-auto sm:px-6 lg:px-8">
            <Container>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
              />
            </Container>
          </div>

          <div className="rounded-b bg-stone-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button onClick={hideModal}>Close</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthDialog;
