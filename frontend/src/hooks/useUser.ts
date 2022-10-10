import { Auth } from '@supabase/auth-ui-react';

const useUser = () => {
  const { session, user } = Auth.useUser();

  return { session, user, username: 'username is todo' };
};

export default useUser;
