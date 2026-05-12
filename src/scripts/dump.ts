import { mkdir, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { gzip as gzipCallback } from 'node:zlib';
import { forEachAsync } from 'es-toolkit';
import { adminDb } from '@/lib/adminDb';

const gzip = promisify(gzipCallback);
const BASE = './backups/instant';

function nowStamp(): string {
	return new Date().toISOString().replace(/[:.]/g, '-');
}

const dump = async () => {
	const path = `${BASE}/${nowStamp()}`;
	mkdir(path, { recursive: true });

	const users = await adminDb.query({
		$users: { recipes: { favoritedBy: {}, image: {}, ingredients: {} } },
	});
	const data = JSON.stringify(users);
	const gz = await gzip(Buffer.from(data), { level: 9 });
	await writeFile(`${path}/data.json.gz`, gz);

	const { $files } = await adminDb.query({ $files: {} });

	await forEachAsync(
		$files,
		async (file) => {
			const response = await fetch(file.url);
			const blob = await response.blob();
			const ext = file['content-type'].split('/')[1];
			const dest = `${path}/${file.path}.${ext}`;
			await writeFile(dest, blob.stream());
		},
		{ concurrency: 1 },
	);
};

dump();
