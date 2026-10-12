import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

export function DescriptionDialog({ description }: { description: string }) {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="ghost" className="underline">
						Description
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Description</DialogTitle>
				</DialogHeader>

				<div>{description}</div>

				<DialogFooter>
					<DialogClose render={<Button variant="secondary">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
