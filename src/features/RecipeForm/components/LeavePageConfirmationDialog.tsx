import { useBlocker } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

interface Props {
	shouldBlock: boolean;
}

export const LeavePageConfirmationDialog = ({ shouldBlock }: Props) => {
	const { proceed, reset, status } = useBlocker({
		shouldBlockFn: () => shouldBlock,
		enableBeforeUnload: shouldBlock,
		withResolver: true,
	});

	return (
		<Dialog open={status === 'blocked'}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Leave this page?</DialogTitle>
					<DialogDescription>
						You have unsaved changes that may be lost.
					</DialogDescription>

					<DialogClose onClick={reset} />
				</DialogHeader>
				<DialogFooter>
					<Button variant="secondary" onClick={reset}>
						No, stay
					</Button>
					<Button onClick={proceed}>Yes, leave</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
