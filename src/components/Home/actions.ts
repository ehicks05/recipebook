'use server'

import { revalidatePath } from "next/cache";
import { prisma } from "server/db";

export const toggleFavorite = async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
	const favorite = await prisma.userFavorites.findUnique({
		where: { userId_recipeId: { userId, recipeId } },
	});
	try {
		favorite ? await prisma.userFavorites.delete({
			where: { userId_recipeId: { userId, recipeId } },
		}) : await prisma.userFavorites.create({
			data: { userId, recipeId },
		});
		revalidatePath('/');
	} catch (e) {
		const err = e instanceof Error ? e : undefined;
		return {
			err, title: `Unable to ${favorite ? 'remove recipe from' : 'add recipe to'} favorites`
		};
	}
	return { title: `Recipe ${favorite ? 'removed from' : 'added to'} favorites` };
}