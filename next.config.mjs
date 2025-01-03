// @ts-check

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	images: {
		// loader: 'custom',
		// loaderFile: './src/utils/supabase-image-loader.ts',
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/a/48ri51yc2x/**',
			},
			// {
			// 	protocol: 'https',
			// 	hostname: 'sgermtzfqlzegifqvold.supabase.co',
			// 	port: '',
			// 	pathname: '/storage/v1/object/public/**',
			// },
		],
	},
};

export default bundleAnalyzer(config);
