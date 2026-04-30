import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { T } from '@/components/core';
import type { FormRecipe } from '../../types';
import { EmojiDialog } from './EmojiDialog';

export const EmojiInput = ({ control }: { control: Control<FormRecipe> }) => {
	return (
		<Controller
			name="emoji"
			control={control}
			render={({ field }) => (
				<div className="flex flex-col gap-1">
					<span>
						<T>Emoji</T>
					</span>

          <EmojiDialog field={field} />
					
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
