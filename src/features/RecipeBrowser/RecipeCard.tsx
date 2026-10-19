import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import { Star } from 'lucide-react';
import { Card, RecipeImage } from '@/components/core';
import { FavoriteButton } from '@/components/core/FavoriteButton';
import type { Recipe } from '@/functions/recipes.functions';

const getScaledTextSize = (text: string) =>
	text.length < 34 ? 'text-xl' : text.length < 38 ? 'text-lg' : 'text-base';

const FeaturedIcon = () => (
	<div title="Recipe of the day" className="flex p-2 rounded absolute top-2 left-2">
		<Star size={16} className="text-yellow-400 fill-yellow-400" />
	</div>
);

interface Props {
	recipe: Recipe;
}

export const RecipeCard = ({
	recipe: { id, emoji, name, author, description, isFeatured, favoritedBy },
}: Props) => {
	return (
		<Link to="/recipes/$id" params={{ id }} preload={false}>
			<Card className="h-88 flex flex-col gap-4 bg-muted border border-muted">
				<div className="relative -m-4 mb-0 h-48">
					<div className="size-full rounded-t bg-sidebar">
						<RecipeImage emoji={emoji} className="h-full rounded-t" />
					</div>
					{isFeatured && <FeaturedIcon />}
					<div className="absolute bottom-2 right-2">
						<FavoriteButton recipeId={id} favoritedBy={favoritedBy} />
					</div>
				</div>

				<div className="flex items-start gap-2">
					<div className="w-full">
						<div
							className={cn(
								'font-extrabold text-orange-700 dark:text-orange-400',
								getScaledTextSize(name),
							)}
						>
							{name}
						</div>
						<div className="text-sm text-muted-foreground">{author?.name}</div>
					</div>
				</div>
				<span className="line-clamp-3 text-sm">{description}</span>
			</Card>
		</Link>
	);
};
