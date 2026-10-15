import { Link } from '@tanstack/react-router';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import type { Recipe } from '@/functions/recipes';

interface Props {
	title: string;
	recipes?: Recipe[];
}

export const RecipeTable = ({ title, recipes }: Props) => {
	return (
		<div className="flex flex-col gap-2 mx-auto w-full overflow-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead colSpan={10}>{title}</TableHead>
					</TableRow>
					<TableRow>
						<TableHead className="w-8">Icon</TableHead>
						<TableHead className="w-32 text-right">Created</TableHead>
						<TableHead className="w-32 text-right">Updated</TableHead>
						<TableHead className="w-20">Author</TableHead>
						<TableHead>Name</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{recipes?.map((recipe) => (
						<TableRow key={recipe.id}>
							<TableCell>{recipe.emoji}</TableCell>
							<TableCell className="text-right">
								{recipe.createdAt.toLocaleString()}
							</TableCell>
							<TableCell className="text-right">
								{recipe.updatedAt.toLocaleString()}
							</TableCell>
							<TableCell>{recipe.author.name}</TableCell>
							<Link to="/recipes/$id" params={{ id: recipe.id }}>
								<TableCell className="underline">{recipe.name}</TableCell>
							</Link>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
