'use client';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import { fetchHtml } from '@/middleware/fetchHtml';

export const useFetchHtml = (url?: string) => {
	const fetchHtmlFetch = useServerFn(fetchHtml);
	const [html, setHtml] = useState<Awaited<
		ReturnType<typeof fetchHtmlFetch>
	> | null>(null);

	useEffect(() => {
		if (url) {
			fetchHtmlFetch({ data: { url } }).then(setHtml);
		} else {
			setHtml(null);
		}
	}, [fetchHtmlFetch, url]);

	return { html };
};
