import { ensureSession } from '@better-auth-ui/core';
import { ensureSessionServer } from '@better-auth-ui/core/server';
import type { QueryClient } from '@tanstack/react-query';
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from '@tanstack/react-router';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { PageLayout } from '@/components/Layout/PageLayout';
import { Providers } from '@/components/providers';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { GlobalErrorComponent } from '@/GlobalErrorComponent';
import { GlobalNotFoundComponent } from '@/GlobalNotFoundComponent';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import appCss from '../styles.css?url';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	beforeLoad: async ({ context: { queryClient } }) => {
		const ensureSessionIso = createIsomorphicFn()
			.server(() =>
				ensureSessionServer(queryClient, auth, { headers: getRequestHeaders() }),
			)
			.client(() => ensureSession(queryClient, authClient));

		const session = await ensureSessionIso();
		return { session };
	},
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
			<body>
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
