import type Picker from 'emoji-picker-element/picker';
import type { EmojiClickEvent } from 'emoji-picker-element/shared';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

interface EmojiPickerProps {
	onEmojiClick: (e: EmojiClickEvent) => void;
	children?: ReactNode;
}

export const EmojiPicker = ({ onEmojiClick, children }: EmojiPickerProps) => {
	const ref = useRef<Picker>(null);

	useEffect(() => {
		const { current } = ref;
		if (!current) {
			return;
		}
		const load = async () => await import('emoji-picker-element');
		void load();

		current.addEventListener('emoji-click', onEmojiClick);
		return () => {
			current.removeEventListener('emoji-click', onEmojiClick);
		};
	});

	// @ts-expect-error web component
	return <emoji-picker ref={ref}>{children}</emoji-picker>;
};
