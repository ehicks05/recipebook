import { useNavigate, useRouter } from '@tanstack/react-router';
import { HiTrash } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { deleteRecipe } from '@/functions/recipes';

export function DeleteRecipeDialog({ id, name }: { id: string; name: string }) {
	const router = useRouter();
	const navigate = useNavigate();

	const handleClick = async () => {
		await deleteRecipe({ data: { id } });
		await router.invalidate();
		navigate({ to: '/' });
	};

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="destructive">
						Delete
						<HiTrash />
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete the recipe for{' '}
						<span className="font-bold">{name}</span>?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="sm:justify-start">
					<Button onClick={handleClick} variant="destructive">
						Delete
					</Button>
					<DialogClose render={<Button variant="secondary">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
