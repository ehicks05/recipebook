'use client';

import { createFileRoute } from '@tanstack/react-router';
import { Card } from '@/components/core';
import { PageLayout } from '@/components/Layout/PageLayout';
import { Account } from '@/features/Account/Account';
import { clientDb } from '@/lib/db';

export const Route = createFileRoute('/me')({
	component: RouteComponent,
});

const NotLoggedIn = () => <Card>Log in to view account info</Card>;

function RouteComponent() {
	return (
		<PageLayout>
			<clientDb.SignedIn>
				<Account />
			</clientDb.SignedIn>
			<clientDb.SignedOut>
				<NotLoggedIn />
			</clientDb.SignedOut>
		</PageLayout>
	);
}
