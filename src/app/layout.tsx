import { ClerkProvider } from '@clerk/nextjs';
import Footer from 'components/coreLayout/Footer';
import Nav from 'components/coreLayout/Nav';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { dark } from '@clerk/themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { TRPCReactProvider } from 'trpc/react';

export const metadata: Metadata = {
	title: 'RecipeBook',
};

const ubuntu = Ubuntu({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body
				className={`h-screen flex flex-col dark:bg-neutral-900 ${ubuntu.className}`}
			>
				<ClerkProvider dynamic appearance={{ baseTheme: dark }}>
					<TRPCReactProvider>
						<Nav />
						{children}
					</TRPCReactProvider>
				</ClerkProvider>
				<div className="flex-grow" />
				<Toaster position="bottom-right" reverseOrder={false} />
				<Footer />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
