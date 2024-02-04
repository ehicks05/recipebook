import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: [
		'/api/webhooks(.*)',
		'/',
		'/account',
		'/recipe(.*)',
		'/recipe-import',
		'/api/(.*)',
	],
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
