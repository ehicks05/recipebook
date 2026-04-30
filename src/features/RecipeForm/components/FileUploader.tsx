import { round } from 'es-toolkit';
import { type ChangeEvent, useEffect, useState } from 'react';
import { MyInput } from '@/components/core';
import { Button } from '@/components/core/Button';
import { clientDb } from '@/lib/db';

const fmt = new Intl.NumberFormat();

const FileSize = ({ size }: { size: number }) => {
	const kBs = round(size / 1024);
	return `${fmt.format(kBs)} kB`;
};

export const FileUploader = ({ path }: { path: string }) => {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | undefined>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setFile(file || null);
	};

	// Manage preview URL lifecycle
	useEffect(() => {
		if (!file) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [file]);

	const handleUpload = async () => {
		if (!file) {
			return;
		}
		const { data } = await clientDb.storage.uploadFile(path, file);
		await clientDb.transact(clientDb.tx.recipes[path].link({ image: data.id }));
	};

	return (
		<div className="max-w-full">
			<MyInput type="file" onChange={handleChange} accept="image/*" />
			{file && preview && (
				<div className="max-w-full">
					<img src={preview} alt="File Preview" className="w-full" />
					<div className="flex justify-between">
						<div>
							<FileSize size={file.size} />
						</div>
						<div>{file.type}</div>
					</div>
					<Button type="button" className="mt-4" onClick={handleUpload}>
						Upload
					</Button>
				</div>
			)}
		</div>
	);
};
