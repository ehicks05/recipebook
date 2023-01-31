import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { Button, Dialog, T } from "components/core";
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
      body={
        <Container>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["discord"]}
            socialLayout="horizontal"
          />
        </Container>
      }
    />
  );
};

export default AuthDialog;
