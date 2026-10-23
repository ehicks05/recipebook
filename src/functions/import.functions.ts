import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

export const fetchHtmlServerFn = createServerFn()
	.validator(z.object({ url: z.url() }))
	.handler(async ({ data: { url } }) => {
		const result = await fetch(url);
		return result.text();
	});
