import type { EmojiClickEvent } from 'emoji-picker-element/shared';
import type { ControllerRenderProps } from 'react-hook-form';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import type { FormRecipe } from '../types';
import { EmojiPicker } from './EmojiPicker';

interface Props {
	field: ControllerRenderProps<FormRecipe, 'emoji'>;
}

export function EmojiDialog({ field }: Props) {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="outline" className="size-fit py-4 text-6xl">
						{field.value || <HiQuestionMarkCircle />}
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Pick an emoji</DialogTitle>
					<DialogDescription>
						Choose one of these emojis to represent your recipe
					</DialogDescription>
				</DialogHeader>
				<div className="mx-auto">
					<EmojiPicker
						onEmojiClick={(e: EmojiClickEvent) => {
							console.log(e.detail);
							field.onChange(e.detail.unicode);
						}}
					/>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose render={<Button type="button">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
