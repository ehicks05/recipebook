import { useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import z from 'zod';
import { SiteIcon } from '@/components/Layout/SiteLogo/SiteLogo';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { clientDb } from '@/lib/db';
import { getImageUrl } from '@/middleware/getImageUrl';

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

export const LoginForm = () => {
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
		<div className="max-w-sm mx-auto grow flex flex-col justify-center gap-6">
			<div className="flex flex-col items-center gap-2 text-center">
				<div className="flex size-8 items-center justify-center rounded-md">
					<SiteIcon />
				</div>
				<h1 className="text-xl font-bold">Welcome to RecipeBook.</h1>
				<FieldDescription>
					{stage === 'email'
						? 'Enter your email to receive a magic code'
						: `We sent a code to ${emailInput}`}
				</FieldDescription>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					stage === 'email' ? sendEmail() : loginWithCode();
				}}
			>
				<FieldGroup>
					{stage === 'email' ? (
						<>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									type="email"
									name="email"
									value={emailInput}
									onChange={(e) => setEmailInput(e.target.value)}
									placeholder="you@example.com"
									required
									autoFocus
								/>
							</Field>
							<Field>
								<Button type="submit" disabled={!emailInput}>
									Send Magic Code
								</Button>
							</Field>
						</>
					) : (
						<>
							<Field>
								<FieldLabel htmlFor="code">Code</FieldLabel>
								<Input
									type="text"
									name="code"
									value={codeInput}
									onChange={(e) => setCodeInput(e.target.value)}
									placeholder="Enter your code"
									required
									autoFocus
								/>
							</Field>
							<Field>
								<Button type="submit" disabled={!codeInput}>
									Submit
								</Button>
							</Field>
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
				</FieldGroup>
			</form>
		</div>
	);
};
