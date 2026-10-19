import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { userFavorites } from '@/db/schema';

export const toggleUserFavorite = async ({
	userId,
	recipeId,
}: {
	userId: string;
	recipeId: string;
}) => {
	const existingFavorite = await db.query.userFavorites.findFirst({
		where: { userId, recipeId },
	});
	if (existingFavorite) {
		await db
			.delete(userFavorites)
			.where(
				and(eq(userFavorites.userId, userId), eq(userFavorites.recipeId, recipeId)),
			);
	} else {
		await db.insert(userFavorites).values({ userId, recipeId });
	}
};
