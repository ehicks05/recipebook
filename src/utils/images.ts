import { supabase } from 'utils/supabase';
import { BUCKETS } from '../constants/buckets';

export const getObjectName = ({
	userId,
	recipeId,
}: { userId: string; recipeId: string }) => `${userId}/${recipeId}/recipe-image`;

export const getImageSrc = ({
	userId,
	recipeId,
}: { userId: string; recipeId: string }) =>
	`/${BUCKETS.RECIPE_IMAGES}/${getObjectName({ userId, recipeId })}`;

export const uploadImage = async ({
	userId,
	recipeId,
	file,
	contentType,
}: {
	userId: string;
	recipeId: string;
	file: FormDataEntryValue;
	contentType: string;
}) =>
	await supabase.storage
		.from(BUCKETS.RECIPE_IMAGES)
		.upload(getObjectName({ userId, recipeId }), file, {
			upsert: true,
			contentType,
		});

export const removeImage = async ({
	userId,
	recipeId,
}: { userId: string; recipeId: string }) =>
	await supabase.storage
		.from(BUCKETS.RECIPE_IMAGES)
		.remove([getObjectName({ userId, recipeId })]);
