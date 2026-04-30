import { createFileRoute, redirect } from '@tanstack/react-router';
import { RecipePicker } from '@/components/Home/RecipePicker';
import { clientDb } from '@/lib/db';

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
		<div className="flex flex-col">
			<RecipePicker />
		</div>
	);
}
