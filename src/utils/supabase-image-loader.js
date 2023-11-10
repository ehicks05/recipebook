'use client'

import { env } from "env/client.mjs";

const projectId = env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;

const supabaseLoader = ({ src, width, quality }) => {
  console.log('hi')
  const base = `https://${projectId}.supabase.co/storage/v1/render/image/public`;
  // return `${base}${src}?width=${width}&quality=${quality || 75}`;
  return `${base}${src}`;
}

export default supabaseLoader;
