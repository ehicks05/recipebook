import { createServerFn, useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import z from 'zod';

const fetchHtmlServerFn = createServerFn()
	.validator(z.object({ url: z.url() }))
	.handler(async ({ data: { url } }) => {
		const result = await fetch(url);
		return result.text();
	});

export const useFetchHtml = (url?: string) => {
	const fetchHtml = useServerFn(fetchHtmlServerFn);
	const [html, setHtml] = useState<string>('');

	useEffect(() => {
		if (url) {
			fetchHtml({ data: { url } }).then(setHtml);
		} else {
			setHtml('');
		}
	}, [fetchHtml, url]);

	return { html };
};
