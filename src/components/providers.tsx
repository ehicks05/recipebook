import { Link, useNavigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';
import { AuthProvider } from './auth/auth-provider';
import { Toaster } from './ui/sonner';

export function Providers({ children }: { children: ReactNode }) {
	const navigate = useNavigate();

	return (
		<AuthProvider
			authClient={authClient}
			redirectTo="/"
			socialProviders={['github', 'google']}
			emailAndPassword={{ enabled: false }}
			navigate={navigate}
			plugins={[]}
			Link={({ href, ...props }) => <Link to={href} {...props} />}
		>
			{children}

			<Toaster />
		</AuthProvider>
	);
}
