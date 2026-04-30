// Here, we're going to make a little fake "getSecretData" function,

import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

export const fetchHtml = createServerFn()
	.inputValidator(z.object({ url: z.url() }))
	.handler(async ({ data: { url } }) => {
		const result = await fetch(url);
		return result.text();
	});
