import { env } from 'env/client.mjs';
const UPLOADTHING_APP_ID = env.NEXT_PUBLIC_UPLOADTHING_APP_ID;
export const UPLOADTHING_BASE_URL = `https://utfs.io/a/${UPLOADTHING_APP_ID}`;
