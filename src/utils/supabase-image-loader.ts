'use client';

import { env } from 'env/client.mjs';

const projectId = env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;

interface Params {
	src: string;
	width?: number;
	quality?: number;
}

const supabaseLoader = ({ src, width, quality }: Params) => {
	const base = `https://${projectId}.supabase.co/storage/v1/object/public`;
	// transform needs pro plan
	const transform = `?width=${width || 300}&quality=${quality || 75}`;
	return `${base}${src}`;
};

export default supabaseLoader;
