import React, { useEffect, useRef } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { Alert, Button, Dialog, T } from "components/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useDarkMode } from "usehooks-ts";
import { toast } from "react-hot-toast";

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
  const { isDarkMode } = useDarkMode();
  const prevState = useRef("");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event !== prevState.current) {
        toast.custom((t) => (
          <Alert
            variant="success"
            title={event
              .split("_")
              .map((s) => s.charAt(0) + s.slice(1).toLowerCase())
              .join(" ")}
            className={t.visible ? "animate-enter" : "animate-leave"}
          />
        ));
      }
      prevState.current = event;
      hideModal();
    });

    return () => subscription.unsubscribe();
  }, [hideModal, supabase]);

  return (
    <Dialog
      open={isOpen}
      onClose={hideModal}
      body={
        <Container>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme={isDarkMode ? "dark" : undefined}
            providers={["discord"]}
            socialLayout="horizontal"
          />
        </Container>
      }
    />
  );
};

export default AuthDialog;
