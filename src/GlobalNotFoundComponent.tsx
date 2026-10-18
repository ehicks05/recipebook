import { Link } from '@tanstack/react-router';
import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GlobalNotFoundComponent() {
	return (
		<div className="flex grow flex-col items-center justify-center bg-background px-4 text-center">
			<div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
				<FileQuestion className="h-10 w-10 text-muted-foreground" />
			</div>

			<h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
				404 - Page Not Found
			</h1>

			<p className="mt-3 max-w-md text-muted-foreground text-balance">
				Sorry, we couldn't find the page you're looking for. It might have been
				moved, deleted, or never existed.
			</p>

			<div className="mt-8 flex flex-col gap-3 sm:flex-row">
				<Button
					variant="outline"
					onClick={() => window.history.back()}
					className="gap-2"
				>
					<ArrowLeft className="h-4 w-4" />
					Go Back
				</Button>

				<Link to="/">
					<Button className="gap-2">
						<Home className="h-4 w-4" />
						Back to Home
					</Button>
				</Link>
			</div>
		</div>
	);
}
