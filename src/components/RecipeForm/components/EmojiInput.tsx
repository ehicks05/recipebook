import { Button, Dialog, T } from 'components/core';
import type { EmojiClickEvent } from 'emoji-picker-element/shared';
import { useState } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import type { FormRecipe } from '../types';
import EmojiPicker from './EmojiPicker';

const EmojiInput = ({ control }: { control: Control<FormRecipe> }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Controller
			name="emoji"
			control={control}
			render={({ field }) => (
				<div className="flex flex-col gap-1">
					<span>
						<T>Emoji</T>
					</span>
					<Button
						type="button"
						className="max-w-fit py-4 text-6xl"
						onClick={() => setIsOpen(true)}
					>
						{field.value || <HiQuestionMarkCircle />}
					</Button>
					<Dialog
						open={isOpen}
						onClose={() => setIsOpen(false)}
						body={
							<div className="mx-auto w-min">
								<EmojiPicker
									onEmojiClick={(e: EmojiClickEvent) => {
										console.log(e.detail);
										field.onChange(e.detail.unicode);
									}}
									// categories={["foods"]}
									// previewPosition="none"
									// searchPosition="none"
									// perLine={6}
									// emojiSize={36}
									// emojiButtonSize={48}
								/>
							</div>
						}
						footer={<div />}
					/>
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

export default EmojiInput;
