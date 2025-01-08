// @ts-check
import { fileURLToPath } from 'node:url';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { createJiti } from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti.import('./src/env');

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/a/48ri51yc2x/**',
			},
		],
	},
};

export default bundleAnalyzer(config);
