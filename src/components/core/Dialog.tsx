import { Dialog as HLDialog } from '@headlessui/react';
import { Button, Container } from 'components/core';
import type { ReactNode } from 'react';

const Dialog = ({
	open,
	onClose,
	body,
	footer,
}: {
	open: boolean;
	onClose: () => void;
	body: ReactNode;
	footer?: ReactNode;
}) => {
	return (
		<HLDialog
			open={open}
			onClose={() => onClose()}
			className="fixed inset-0 z-50 overflow-y-auto"
		>
			<div className="flex min-h-screen items-center justify-center">
				<HLDialog.Overlay className="fixed inset-0 bg-black opacity-30" />

				<div className="z-20 mx-auto rounded bg-white dark:bg-stone-900">
					<div className="mx-auto py-8 px-4 sm:px-6 lg:px-8">
						<Container>{body}</Container>
					</div>

					<div className="flex justify-end gap-4 rounded-b bg-stone-200 px-4 py-3 dark:bg-stone-800 sm:px-6">
						<Button onClick={() => onClose()}>Close</Button>
						{footer}
					</div>
				</div>
			</div>
		</HLDialog>
	);
};

export default Dialog;
