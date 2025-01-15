import clsx from 'clsx';
import { Alert } from 'components/core';
import rht, { type ToastOptions } from 'react-hot-toast';

export const toast = ({
	variant,
	title,
	description,
	className,
	options,
}: {
	variant: 'error' | 'info' | 'success' | 'neutral';
	title: string;
	description?: string;
	className?: string;
	options?: ToastOptions;
}) =>
	rht.custom(
		(t: { visible: boolean }) => (
			<Alert
				variant={variant}
				title={title}
				description={description}
				className={clsx(t.visible ? 'animate-enter' : 'animate-leave', className)}
			/>
		),
		options,
	);

export const dismissToast = rht.dismiss;
