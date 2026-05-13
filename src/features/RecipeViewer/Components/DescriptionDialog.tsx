import { Button } from '@/components/core';
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
				render={<span className="underline cursor-pointer">Description</span>}
			/>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Description</DialogTitle>
				</DialogHeader>

				<div>{description}</div>

				<DialogFooter className="sm:justify-start">
					<DialogClose render={<Button type="button">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
