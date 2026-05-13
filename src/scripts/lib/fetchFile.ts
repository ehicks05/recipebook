import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { File } from '@/instant.types';

export const fetchFile = async (file: File, localFilePath?: string) => {
	if (localFilePath) {
		const fullPath = path.resolve(localFilePath, file.path);
		const foo = await readFile(fullPath);
		const buffer = Buffer.from(foo);
		return buffer;
	}

	const response = await fetch(file.url);
	const blob = await response.blob();
	const ab = await blob.arrayBuffer();
	const buffer = Buffer.from(ab);
	return buffer;
};
