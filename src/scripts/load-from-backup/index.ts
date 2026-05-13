import { readFile } from 'node:fs/promises';
import * as nodepath from 'node:path';
import { gunzipSync } from 'node:zlib';
import { load } from '../lib/load';

const BACKUPS_PATH = './backups/instant';
const file = 'data.json.gz';

// set this to the backup folder you want to restore from
const backupPath = '';

const loadFromBackup = async () => {
	const path = nodepath.resolve(BACKUPS_PATH, backupPath);
	const zipped = await readFile(nodepath.resolve(path, file));
	const text = gunzipSync(zipped);
	const { $users } = JSON.parse(text);

	load($users, path);
};

loadFromBackup();
