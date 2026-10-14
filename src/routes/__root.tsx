import {
	createRootRoute,
	ErrorComponent,
	HeadContent,
	Scripts,
} from '@tanstack/react-router';
import { Providers } from '@/components/providers';
import { ThemeProvider } from '@/components/ui/theme-provider';
import appCss from '../styles.css?url';

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'RecipeBook' },
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'icon', href: '/favicon.png' },
		],
	}),
	errorComponent: (err) => <ErrorComponent error={err.error} />,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="flex flex-col bg-body-background">
				<ThemeProvider storageKey="theme" defaultTheme="system">
					<Providers>{children}</Providers>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
