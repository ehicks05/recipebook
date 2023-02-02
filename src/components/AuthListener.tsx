import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEventListener } from "usehooks-ts";

/**
 * Experimental
 *
 * For cross-tab auth syncing. After logging in, logging out, or session expiration,
 * should detect on window focus. Delete if not useful.
 */
const AuthListener = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  useEventListener("focus", () => {
    const handler = async () => {
      const session = await supabase.auth.getSession();

      if (user && !session.data.session) {
        console.log("Unable to detect a session. signing out...");
        await supabase.auth.signOut();
      }
    };
    void handler();
  });

  return null;
};

export default AuthListener;
