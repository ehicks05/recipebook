import type { AppType } from 'next/app';
import { Ubuntu } from 'next/font/google';

import { api } from '../utils/api';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from 'components/Footer';
import Nav from 'components/PagesNav';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const ubuntu = Ubuntu({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	// default, can also use "swap" to ensure custom font always shows
	display: 'optional',
});

const MyApp: AppType = ({ Component, pageProps }) => {
	const router = useRouter();

	return (
		<ClerkProvider
			{...pageProps}
			appearance={{ baseTheme: dark, variables: { colorInputText: '#222' } }}
		>
			<div className={`flex h-screen flex-col ${ubuntu.className}`}>
				<Nav />
				<Component {...pageProps} key={router.asPath} />
				<div className="flex-grow" />
				<Toaster position="bottom-right" reverseOrder={false} />
				<Footer />
			</div>
			<Analytics />
			<SpeedInsights />
		</ClerkProvider>
	);
};

export default api.withTRPC(MyApp);
