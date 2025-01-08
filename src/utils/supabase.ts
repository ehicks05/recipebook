import { createClient } from '@supabase/supabase-js';
import { env } from 'env';

const { SUPABASE_URL, SUPABASE_ADMIN_KEY } = env;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ADMIN_KEY);
