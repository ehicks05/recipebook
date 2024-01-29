import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { Dialog, T } from "components/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useDarkMode } from "usehooks-ts";
import { api } from "utils/api";

export const AuthWrapper = ({view}: {view?: ViewType}) => {
  const { isDarkMode } = useDarkMode();
  const supabase = useSupabaseClient();

  return <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme={isDarkMode ? "dark" : undefined}
    providers={["discord"]}
    socialLayout="horizontal"
    magicLink
    view={view}
  />
}

interface AuthDialogProps {
  isOpen: boolean;
  hideModal: () => void;
}

const AuthDialog = ({ isOpen, hideModal }: AuthDialogProps) => {
  const supabase = useSupabaseClient();
  const utils = api.useContext();
  const user = useUser();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (!["SIGNED_IN", "SIGNED_OUT"].includes(event)) {
        return;
      }
      void utils.invalidate();
    });

    return () => subscription.unsubscribe();
  }, [supabase, utils]);

  useEffect(() => {
    if (user) {
      hideModal();
    }
  }, [user, hideModal]);

  return (
    <Dialog
      open={isOpen}
      onClose={hideModal}
      body={user ? <T>Welcome!</T> : <AuthWrapper />}
    />
  );
};

export default AuthDialog;
