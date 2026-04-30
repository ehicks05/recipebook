'use client';

import { createFileRoute } from '@tanstack/react-router';
import { Card, T } from '@/components/core';
import { Account } from '@/features/Account/Account';
import { clientDb } from '@/lib/db';

export const Route = createFileRoute('/me')({
	component: RouteComponent,
});

const NotLoggedIn = () => (
	<Card>
		<T>Log in to view account info</T>
	</Card>
);

function RouteComponent() {
	return (
		<>
			<clientDb.SignedIn>
				<Account />
			</clientDb.SignedIn>
			<clientDb.SignedOut>
				<NotLoggedIn />
			</clientDb.SignedOut>
		</>
	);
}
