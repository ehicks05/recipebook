'use client';

import { createFileRoute } from '@tanstack/react-router';
import { Card } from '@/components/core';
import { Account } from '@/features/Account/Account';
import { clientDb } from '@/lib/db';

export const Route = createFileRoute('/me')({
	component: RouteComponent,
});

const NotLoggedIn = () => <Card>Log in to view account info</Card>;

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
