import { createFileRoute } from '@tanstack/react-router';
import { createServerFn, useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import { instantUserMiddleware } from '@/middleware/instant';

export const Route = createFileRoute('/import-recipe')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello "/import-recipe"!
			<SecretData />
		</div>
	);
}

// Here, we're going to make a little fake "getSecretData" function,
// but you could make special queries, or changes, or anything you want
const getSecretData = createServerFn()
	.middleware([instantUserMiddleware])
	.handler(async ({ context }) => {
		if (!context.user) {
			throw new Error('Unauthorized');
		}

		return {
			secretMessage: `This is a secret message returned from createServerFn.
      Only signed-in users can see this.
      This is useful when you need to run server-side only code such as interacting with a 3rd party API.
      You are signed in as ${context.user.isGuest ? 'guest' : context.user.email}.`,
		};
	});

const SecretData = () => {
	const secretDataFetch = useServerFn(getSecretData);
	const [secretData, setSecretData] = useState<Awaited<
		ReturnType<typeof secretDataFetch>
	> | null>(null);

	useEffect(() => {
		secretDataFetch().then(setSecretData);
	}, [secretDataFetch]);

	return (
		<div className="p-6 rounded-lg border flex justify-center flex-col gap-2">
			<div>Secret Message:</div>
			<div>{secretData?.secretMessage}</div>
		</div>
	);
};
