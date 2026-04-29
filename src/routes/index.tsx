import { createFileRoute, redirect } from "@tanstack/react-router";
import {
	createMiddleware,
	createServerFn,
	useServerFn,
} from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useEffect, useState } from "react";
import { RecipePicker } from "@/components/Home/RecipePicker";
import { adminDb } from "@/lib/adminDb";
import { clientDb } from "@/lib/db";

const instantUserMiddleware = createMiddleware().server(async ({ next }) => {
	const request = getRequest();

	// /api/instant keeps your user's cookie in sync
	// this reads the cookie from the request to see who made it
	const user = await adminDb.auth.getUserFromRequest(request);
	return next({
		context: { user },
	});
});

// Here, we're going to make a little fake "getSecretData" function,
// but you could make special queries, or changes, or anything you want
const getSecretData = createServerFn()
	.middleware([instantUserMiddleware])
	.handler(async ({ context }) => {
		if (!context.user) {
			throw new Error("Unauthorized");
		}

		return {
			secretMessage: `This is a secret message returned from createServerFn.
      Only signed-in users can see this.
      This is useful when you need to run server-side only code such as interacting with a 3rd party API.
      You are signed in as ${context.user.isGuest ? "guest" : context.user.email}.`,
		};
	});

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {
		const auth = await clientDb.getAuth();
		if (!auth) {
			throw redirect({
				to: "/login",
			});
		}
	},
	ssr: false,
});

function App() {
	return (
		<div className="flex flex-col">
			<RecipePicker />
			<SecretData />
		</div>
	);
}

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
