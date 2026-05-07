import { createFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/components/Layout/PageLayout';
import { RecipeBrowser } from '@/features/RecipeBrowser/RecipeBrowser';

export const Route = createFileRoute('/')({
	component: App,
	// loader: async () => {
	// 	const auth = await clientDb.getAuth();
	// 	if (!auth) {
	// 		throw redirect({
	// 			to: '/login',
	// 		});
	// 	}
	// },
	ssr: false,
});

function App() {
	return (
		<PageLayout>
			<RecipeBrowser />
		</PageLayout>
	);
}
