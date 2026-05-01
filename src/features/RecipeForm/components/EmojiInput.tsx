import { type Control, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	EmojiPicker,
	EmojiPickerContent,
	EmojiPickerFooter,
	EmojiPickerSearch,
} from '@/components/ui/emoji-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { FormRecipe } from '../types';

export const EmojiInput = ({ control }: { control: Control<FormRecipe> }) => {
	return (
		<Controller
			name="emoji"
			control={control}
			render={({ field }) => (
				<div className="flex flex-col gap-1">
					<span>Emoji</span>

					<Popover>
						<PopoverTrigger
							render={
								<Button variant="outline" className="w-fit size-24 text-6xl" />
							}
						>
							{field.value}
						</PopoverTrigger>
						<PopoverContent>
							<EmojiPicker
								className="h-80"
								onEmojiSelect={({ emoji }) => field.onChange(emoji)}
							>
								<EmojiPickerSearch />
								<EmojiPickerContent />
								<EmojiPickerFooter />
							</EmojiPicker>
						</PopoverContent>
					</Popover>

					{control.getFieldState('emoji').error && (
						<div className="text-sm text-red-600">
							{control.getFieldState('emoji').error?.message}
						</div>
					)}
				</div>
			)}
		/>
	);
};
