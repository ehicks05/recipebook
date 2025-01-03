import { getAuth } from '@clerk/nextjs/server';
import { prisma } from 'server/db';
import { type FileRouter, createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({
		image: {
			/**
			 * For full list of options and defaults, see the File Route API reference
			 * @see https://docs.uploadthing.com/file-routes#route-config
			 */
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
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
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.userId);

			// save the url
			await prisma.recipe.update({
				where: { id: metadata.recipeId },
				data: { imageSrc: file.key },
			});

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
