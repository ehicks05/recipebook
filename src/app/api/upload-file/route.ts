import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest, NextResponse } from 'next/server';
import { getImageSrc, uploadImage } from 'utils/images';
import { prisma } from '../../../server/db';

/**
 * 1. upload image to object store
 * 2. update recipe
 */
export const POST = async function handler(req: NextRequest, res: NextResponse) {
	try {
		console.log('HELLO FROM upload-file POST ROUTE');
		const { userId } = getAuth(req);
		console.log({ userId });
		if (!userId) {
			return new Response('Unauthorized', { status: 401 });
		}

		const formData = await req.formData();

		const recipeId = formData.get('recipeId')?.toString();
		const file = formData.get('file');
		const contentType = formData.get('contentType')?.toString() || 'image/jpeg';

		if (!recipeId || !file || !contentType) {
			return new Response('Missing required fields', { status: 400 });
		}

		const { error } = await uploadImage({
			userId,
			recipeId,
			file,
			contentType,
		});

		if (error) {
			console.error(error);
			return new Response(error.message, { status: 500 });
		}

		const imageSrc = getImageSrc({ userId, recipeId });
		await prisma.recipe.update({
			where: { id: recipeId },
			data: { imageSrc },
		});
	} catch (e) {
		console.log(e);
	}
	return new Response('Success');
};
