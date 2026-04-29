import { useNavigate } from '@tanstack/react-router';
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
import { clientDb } from '@/lib/db';
import { toast } from '@/lib/toast';

export function DeleteRecipeDialog({ id, name }: { id: string; name: string }) {
	const navigate = useNavigate();

	const deleteRecipe = async ({ id }: { id: string }) => {
		await clientDb.transact(clientDb.tx.recipes[id].delete());
		navigate({ to: '/' });
		toast({ variant: 'success', title: 'Recipe deleted' });
	};

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="outline">
						Delete
						<HiTrash />
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete <span className="font-bold">{name}</span>
						?
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-2">
					<div className="grid flex-1 gap-2">
						{/*<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input
							id="link"
							defaultValue="https://ui.shadcn.com/docs/installation"
							readOnly
						/>*/}
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<Button
						onClick={() => deleteRecipe({ id })}
						variant="destructive"
						// disabled={isLoading}
					>
						Delete
					</Button>
					<DialogClose render={<Button type="button">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
