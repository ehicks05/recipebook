import { Dialog } from "@headlessui/react";
import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { Button, T } from "components/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

interface Props {
  children: JSX.Element;
}

const Container = ({ children }: Props) => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleSignOut = () => {
    void supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <T>Welcome {user.email}!</T>
        </div>

        <Button onClick={handleSignOut}>Sign out</Button>
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
  const supabase = useSupabaseClient();

  return (
    <Dialog
      open={isOpen}
      onClose={hideModal}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />

        <div className="z-20 mx-auto w-full rounded bg-stone-900 sm:w-96">
          <div className="mx-auto max-w-sm py-8 px-4 sm:px-6 lg:px-8">
            <Container>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
                providers={["discord"]}
                socialLayout="horizontal"
              />
            </Container>
          </div>

          <div className="rounded-b bg-stone-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button onClick={hideModal}>Close</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthDialog;
