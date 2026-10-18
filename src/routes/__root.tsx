import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { Providers } from '@/components/providers';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { GlobalErrorComponent } from '@/GlobalErrorComponent';
import { GlobalNotFoundComponent } from '@/GlobalNotFoundComponent';
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
	errorComponent: GlobalErrorComponent,
	notFoundComponent: GlobalNotFoundComponent,
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
					<Providers>
						<PageLayout>{children}</PageLayout>
					</Providers>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
