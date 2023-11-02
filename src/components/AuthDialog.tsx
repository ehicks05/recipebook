import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Dialog, T } from "components/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useDarkMode } from "usehooks-ts";
import { api } from "utils/api";
import { useRouter } from "next/navigation";

interface Props {
  children: JSX.Element;
}

const Container = ({ children }: Props) => {
  const user = useUser();

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <T>Welcome {user.email}!</T>
        </div>
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
  const utils = api.useContext();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // only interested in sign in or out
      if (!["SIGNED_IN", "SIGNED_OUT"].includes(event)) {
        return;
      }
      console.log({ event });
      void utils.invalidate();
      if (event === "SIGNED_OUT") {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, utils, router]);

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
