/*
  Backup InstantDB data to a single gzip-compressed JSON file.

  Usage:
    pnpm backup:instantdb

  Output:
    backups/instantdb/instantdb-backup-<ISO_TIMESTAMP>.json.gz

  Requirements:
    - Environment vars: INSTANT_APP_ID, INSTANT_ADMIN_TOKEN
    - Node 18+ (global fetch)
*/

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { gzip as gzipCallback } from 'node:zlib';
import schema from '@/instant.schema';

type SchemaJson = {
	entities: Record<string, unknown>;
	links?: Record<string, unknown>;
	rooms?: Record<string, unknown>;
};

type InstantQueryResponse = any;

async function getSchemaJson(): Promise<SchemaJson> {
	return {
		entities: (schema as any).entities,
		links: (schema as any).links,
		rooms: (schema as any).rooms,
	};
}

function getHeaders(appId: string, adminToken: string): Record<string, string> {
	return {
		'content-type': 'application/json',
		Authorization: `Bearer ${adminToken}`,
		'App-Id': appId,
		// Version headers are optional for the Admin API, omit to reduce coupling
	};
}

async function queryCollection(
	baseUrl: string,
	headers: Record<string, string>,
	collection: string,
): Promise<InstantQueryResponse> {
	const body = { query: { [collection]: {} } };
	const res = await fetch(`${baseUrl}/admin/query`, {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Failed to query ${collection}: ${res.status} ${text}`);
	}
	return res.json();
}

function nowStamp(): string {
	return new Date().toISOString().replace(/[:.]/g, '-');
}

async function main() {
	const repoRoot = path.resolve('.');

	const appId = process.env.VITE_INSTANT_APP_ID!;
	const adminToken = process.env.INSTANT_APP_ADMIN_TOKEN;

	if (!appId || !adminToken) {
		throw new Error(
			'Missing INSTANT_APP_ID or INSTANT_ADMIN_TOKEN in environment. Use dotenvx or export them before running.',
		);
	}

	const baseUrl = process.env.INSTANT_BASE_URL || 'https://api.instantdb.com';
	const headers = getHeaders(appId, adminToken);
	const schemaJson = await getSchemaJson();

	const timestamp = nowStamp();
	const backupDir = path.join(repoRoot, 'backups', 'instantdb');
	await mkdir(backupDir, { recursive: true });

	// Dump entities sequentially for simplicity and stability
	const entityNames = Object.keys(schemaJson.entities || {});
	const perEntityResults: Record<string, InstantQueryResponse> = {};
	for (const name of entityNames) {
		const data = await queryCollection(baseUrl, headers, name);
		perEntityResults[name] = data;
	}

	// Build one combined payload (minified for smaller gzip and memory usage)
	const combined = {
		metadata: {
			createdAt: new Date().toISOString(),
			appId,
			baseUrl,
			entityCount: entityNames.length,
			entities: entityNames,
		},
		schema: schemaJson,
		entities: perEntityResults,
	};
	const combinedJson = JSON.stringify(combined);
	const gzip = promisify(gzipCallback);
	const gz = await gzip(Buffer.from(combinedJson), { level: 9 } as any);
	const outPath = path.join(backupDir, `instantdb-backup-${timestamp}.json.gz`);
	await writeFile(outPath, gz);

	console.log(`Backup written to ${outPath}`);
}

export { main as backupDb };

// main().catch((err) => {
// 	console.error(err);
// 	process.exit(1);
// });
