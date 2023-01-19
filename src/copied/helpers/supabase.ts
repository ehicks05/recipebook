import { createClient } from '@supabase/supabase-js';
import ENVS from './envs';

const supabase = createClient(
  ENVS.VITE_SUPABASE_URL,
  ENVS.VITE_SUPABASE_PUBLIC_KEY
);

export { supabase };
