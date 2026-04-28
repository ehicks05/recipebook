import { prisma } from 'server/db';

const user = async (userId: string) =>
	prisma.appUser.findUnique({ where: { id: userId } });

const createUser = async ({
	id,
	displayName,
}: { id?: string; displayName: string | null }) =>
	prisma.appUser.create({ data: { id, displayName } });

const updateUser = async ({
	id,
	displayName,
}: { id?: string; displayName: string | null }) =>
	prisma.appUser.upsert({
		where: { id },
		create: { id, displayName },
		update: { id, displayName },
	});

export const users = {
	user,
	createUser,
	updateUser,
};
