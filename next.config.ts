import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import './src/env'; // validate env during build

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
	experimental: {
		turbo: {},
	},
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

export default bundleAnalyzer(nextConfig);
