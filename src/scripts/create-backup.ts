import { mkdir, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { gzip as gzipCallback } from 'node:zlib';
import { db } from '@/db';

const gzip = promisify(gzipCallback);
const BASE = './backups';

function nowStamp(): string {
	return new Date().toISOString().replace(/[:.]/g, '-');
}

export const createBackup = async () => {
	const path = `${BASE}/${nowStamp()}`;
	mkdir(path, { recursive: true });

	const users = await db.query.user.findMany({});
	const recipes = await db.query.recipes.findMany({
		with: { favoritedBy: { columns: { id: true } } },
	});
	const data = JSON.stringify({ users, recipes });
	const gz = await gzip(Buffer.from(data), { level: 9 });
	await writeFile(`${path}/data.json.gz`, gz);
};
