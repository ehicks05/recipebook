const ENVS = {
  NODE_ENV: import.meta.env.NODE_ENV,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_PUBLIC_KEY: import.meta.env.VITE_SUPABASE_PUBLIC_KEY,
};

export default ENVS;
