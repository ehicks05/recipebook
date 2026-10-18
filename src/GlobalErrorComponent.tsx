import { type ErrorComponentProps, useRouter } from '@tanstack/react-router';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export function GlobalErrorComponent({ error, reset }: ErrorComponentProps) {
	const router = useRouter();

	useEffect(() => {
		// Log to your error tracking service (e.g., Sentry) here
		console.error('Global Error Boundary caught:', error);
	}, [error]);

	return (
		<div className="flex min-h-[50vh] min-w-full items-center justify-center p-4">
			<Card className="w-full max-w-md border-destructive/50 shadow-lg">
				<CardHeader className="space-y-1">
					<div className="flex items-center gap-2 text-destructive">
						<AlertTriangle className="h-5 w-5" />
						<CardTitle className="text-xl">Something went wrong</CardTitle>
					</div>
					<CardDescription>
						An unexpected error occurred while loading this page.
					</CardDescription>
				</CardHeader>

				<CardContent className="grid gap-4">
					<div className="rounded-md bg-muted p-3 font-mono text-xs max-h-40 overflow-auto whitespace-pre-wrap text-muted-foreground border">
						{error instanceof Error
							? error.message
							: String(error) || 'Unknown error'}
					</div>
				</CardContent>

				<CardFooter className="flex flex-col sm:flex-row gap-2 justify-end">
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							// Clear TanStack Router's cache and attempt to remount
							reset?.();
							router.invalidate();
						}}
					>
						<RotateCcw className="mr-2 h-4 w-4" />
						Try again
					</Button>

					<Button
						variant="default"
						size="sm"
						onClick={() => router.navigate({ to: '/' })}
					>
						<Home className="mr-2 h-4 w-4" />
						Go Home
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
