import { NextResponse } from 'next/server';
import { appRouter } from 'server/api/root';
import { renderTrpcPanel } from 'trpc-ui';

export async function GET() {
	return new NextResponse(
		renderTrpcPanel(appRouter, {
			url: '/api/trpc', // Default trpc route in nextjs
			transformer: 'superjson', // Enabled by default with create-t3-app
		}),
		{
			status: 200,
			headers: [['Content-Type', 'text/html'] as [string, string]],
		},
	);
}
