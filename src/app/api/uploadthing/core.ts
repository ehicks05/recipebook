import { getAuth } from '@clerk/nextjs/server';
import { db } from 'server/db-api';
import { type FileRouter, createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const { userId } = getAuth(req);

			// If you throw, the user will not be able to upload
			if (!userId) {
				throw new UploadThingError('Unauthorized');
			}

			const recipeId = req.headers.get('recipeId');
			if (!recipeId) {
				throw new UploadThingError('Missing recipeId');
			}

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId, recipeId };
		})
		.onUploadError(async (e) => {
			console.log(e);
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const { userId, recipeId } = metadata;
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', userId);

			// save the url
			await db.recipes.updateRecipe(recipeId, userId, { imageSrc: file.key });

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
