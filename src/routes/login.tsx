import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import z from 'zod';
import { Card } from '@/components/core';
import { clientDb } from '@/lib/db';
import { getImageUrl } from '@/middleware/getImageUrl';

export const Route = createFileRoute('/login')({
	component: RouteComponent,
	ssr: false,
	loader: async () => {
		const auth = await clientDb.getAuth();
		if (auth) {
			throw redirect({
				to: '/',
			});
		}
	},
});

const useImageUrl = (email: string) => {
	const imageUrlFetch = useServerFn(getImageUrl);
	const [imageUrl, setImageUrl] = useState<Awaited<
		ReturnType<typeof imageUrlFetch>
	> | null>(null);

	useEffect(() => {
		if (z.email().safeParse(email).success) {
			imageUrlFetch({ data: { email } }).then(setImageUrl);
		}
	}, [imageUrlFetch, email]);

	return imageUrl;
};

function RouteComponent() {
	const [stage, setStage] = useState<'email' | 'code'>('email');
	const [emailInput, setEmailInput] = useState('');
	const [codeInput, setCodeInput] = useState('');
	const navigate = useNavigate();

	const imageUrl = useImageUrl(emailInput);

	const sendEmail = async () => {
		await clientDb.auth.sendMagicCode({ email: emailInput });
		setStage('code');
	};

	const loginWithCode = async () => {
		const verifyResponse = await clientDb.auth.signInWithMagicCode({
			email: emailInput,
			code: codeInput,
			extraFields: {
				displayName: emailInput.split('@')[0],
				imageUrl,
				createdAt: new Date(),
			},
		});
		if (verifyResponse.user) {
			navigate({ to: '/' });
		}
	};

	const goBack = () => {
		setStage('email');
		setCodeInput('');
	};

	return (
		<Card className="flex flex-col gap-4 p-6 w-full max-w-prose mx-auto">
			<h2 className="font-bold text-[#F54A00] text-2xl">
				{stage === 'email' ? 'Sign In' : 'Enter Code'}
			</h2>
			<p className="text-sm">
				{stage === 'email'
					? 'Enter your email to receive a magic code'
					: `We sent a code to ${emailInput}`}
			</p>
			<div className="rounded">
				{stage === 'email' ? (
					<>
						<form
							className="flex items-center border border-neutral-300 h-10"
							onSubmit={(e) => {
								e.preventDefault();
								sendEmail();
							}}
						>
							<input
                type="email"
								name="email"
								value={emailInput}
								onChange={(e) => setEmailInput(e.target.value)}
								placeholder="you@example.com"
								required
								autoFocus
								className="flex-1 h-full px-2 outline-none bg-transparent"
							/>
							<button
								type="submit"
								disabled={!emailInput}
								className="h-full cursor-pointer px-2 border-l border-0 border-neutral-300 bg-accent"
							>
								Send
							</button>
						</form>
						<div className="h-7" />
					</>
				) : (
					<>
						<form
							className="flex items-center h-10 border border-neutral-300"
							onSubmit={(e) => {
								e.preventDefault();
								loginWithCode();
							}}
						>
							<input
								type="text"
								value={codeInput}
								onChange={(e) => setCodeInput(e.target.value)}
								placeholder="Enter your code"
								required
								autoFocus
								className="flex-1 h-full px-2 outline-none bg-transparent"
							/>
							<button
								type="submit"
								disabled={!codeInput}
								className="h-full px-2 cursor-pointer border-l border-neutral-300"
							>
								Submit
							</button>
						</form>
						<div className="flex justify-center items-center h-10 px-2 text-xs">
							<button
								type="button"
								onClick={goBack}
								className="text-muted-foreground"
							>
								Use a different email
							</button>
						</div>
					</>
				)}
			</div>
		</Card>
	);
}
