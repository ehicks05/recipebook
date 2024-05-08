import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest, NextResponse } from 'next/server';
import { BUCKETS } from 'server/api/routers/constants';
import { supabase } from 'utils/supabase';
import { prisma } from '../../../server/db';

export const POST = async function handler(req: NextRequest, res: NextResponse) {
	try {
		const { userId } = getAuth(req);
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

		const objectName = `${userId}/${recipeId}/recipe-image`;
		const { error } = await supabase.storage
			.from(BUCKETS.RECIPE_IMAGES)
			.upload(objectName, file, { upsert: true, contentType });

		if (error) {
			console.error(error);
			return new Response(error.message, { status: 500 });
		}

		const imageSrc = `/${BUCKETS.RECIPE_IMAGES}/${objectName}`;
		await prisma.recipe.update({
			where: { id: recipeId },
			data: { imageSrc },
		});
	} catch (e) {
		console.log(e);
	}
	return new Response('Success');
};
