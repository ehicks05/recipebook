import { ClerkProvider } from '@clerk/nextjs';
import Nav from 'components/AppNav';
import Footer from 'components/Footer';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';

export const metadata: Metadata = {
	title: 'RecipeBook',
};

const ubuntu = Ubuntu({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`h-screen dark:bg-neutral-900 ${ubuntu.className}`}>
				<ClerkProvider
					dynamic
					appearance={{
						baseTheme: dark,
					}}
				>
					<Nav />
					{children}
					<div className="flex-grow" />
					<Toaster position="bottom-right" reverseOrder={false} />
					<Footer />
				</ClerkProvider>
			</body>
		</html>
	);
}
