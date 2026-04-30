// Here, we're going to make a little fake "getSecretData" function,

import crypto from 'node:crypto';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

const SIZE = 200;

export const getImageUrl = createServerFn()
	.inputValidator(z.object({ email: z.email() }))
	.handler(async ({ data: { email } }) => {
		const hash = crypto.createHash('md5').update(email).digest('hex');
		const imageUrl = `https://www.gravatar.com/avatar/${hash}?s=${SIZE}`;
		console.log({ email, imageUrl });
		return imageUrl;
	});
