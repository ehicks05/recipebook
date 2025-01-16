import clsx from 'clsx';
import { Alert } from 'components/core';
import rht, { type ToastOptions } from 'react-hot-toast';

interface Params {
	variant: 'error' | 'info' | 'success' | 'neutral';
	title: string;
	description?: string;
	className?: string;
	options?: ToastOptions;
}

export const toast = ({ variant, title, description, className, options }: Params) =>
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
