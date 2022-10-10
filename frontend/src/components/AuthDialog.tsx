import { Dialog } from '@headlessui/react';
import React from 'react';
import { Auth, Button, Typography } from '@supabase/ui';
import { useClient, useAuthStateChange } from 'react-supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import useUser from 'hooks/useUser';

const Container: React.FC<{
  supabaseClient: SupabaseClient;
  children: JSX.Element;
}> = ({ supabaseClient, children }) => {
  const { user } = useUser();

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <Typography.Text>Welcome {user.email}!</Typography.Text>
        </div>

        <Button block onClick={() => supabaseClient.auth.signOut()}>
          Sign out
        </Button>
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
  const supabase = useClient();
  useAuthStateChange(event => {
    console.log(event);
  });

  return (
    <Dialog
      open={isOpen}
      onClose={hideModal}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="z-20 bg-white rounded max-w-sm mx-auto">
          <div className="py-8 px-4 max-w-sm mx-auto sm:px-6 lg:px-8">
            <Container supabaseClient={supabase}>
              <Auth supabaseClient={supabase} />
            </Container>
          </div>

          <div className="rounded-b bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button type="default" onClick={hideModal}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthDialog;
