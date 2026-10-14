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
import type { Recipe } from '@/functions/recipes';

export function DescriptionDialog({ recipe }: { recipe: Recipe }) {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="outline" size="sm">
						More Info
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Description</DialogTitle>
					<DialogDescription>
						{recipe.description}
						{recipe.source && (
							<div className="flex gap-1 pt-4">
								<span>Source:</span>
								<a
									href={recipe.source}
									target="_blank"
									rel="noreferrer"
									className="underline"
								>
									{new URL(recipe.source).host.split('.').slice(-2).join('.')}
								</a>
							</div>
						)}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose render={<Button variant="secondary">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
