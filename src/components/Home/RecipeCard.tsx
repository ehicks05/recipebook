import { useUser } from '@clerk/nextjs';
import FavoriteButton from 'components/Home/FavoriteButton';
import { Card, RecipeImage, T } from 'components/core';
import { DIFFICULTIES } from 'components/core/Difficulty';
import Link from 'next/link';
import React from 'react';
import { HiOutlineClock, HiStar } from 'react-icons/hi';
import type { CompleteRecipe } from 'server/api/routers/example';
import { api } from 'utils/api';

interface Props {
	recipe: CompleteRecipe;
}

const RecipeCard = ({
	recipe: {
		id,
		emoji,
		name,
		author,
		description,
		cookingTime,
		difficulty,
		imageSrc,
	},
}: Props) => {
	const { user } = useUser();

	const { data: recipeOfTheDay } = api.example.getRecipeOfTheDay.useQuery();

	return (
		<Link href={`/recipe/${id}`}>
			<Card className="transform border border-neutral-100 transition-all hover:shadow-md dark:border-neutral-700">
				<div className="flex h-80 flex-col gap-4">
					<div className="-m-4 mb-0 h-48">
						<RecipeImage
							imageSrc={imageSrc}
							emoji={emoji}
							className="h-48 w-full rounded-t object-cover"
						/>
						{recipeOfTheDay?.id === id && (
							<div className="flex gap-2 items-center p-2 rounded bg-neutral-700 text-white absolute top-2 right-2 shadow-xl">
								<HiStar className="text-yellow-400" />
								Recipe of the day
								<HiStar className="text-yellow-400" />
							</div>
						)}
					</div>
					{/* title row */}
					<div className="flex items-start gap-2">
						<div className="w-full">
							<div className="text-xl font-semibold text-amber-700 dark:text-amber-400">
								{name}
							</div>
							<div className="text-xs dark:text-neutral-200">
								{author.displayName} | {DIFFICULTIES[difficulty]?.label || 'easy'} |{' '}
								<HiOutlineClock size={16} className="inline dark:text-neutral-200" />{' '}
								{cookingTime}
							</div>
						</div>
						{user && <FavoriteButton className="-mr-2 -mt-9" recipeId={id} />}
					</div>
					<T className="line-clamp-2 text-sm">{description}</T>
				</div>
			</Card>
		</Link>
	);
};

function RecipeCardLandscape({
	recipe: { id, emoji, name, description, imageSrc },
}: Props) {
	return (
		<Link href={`/recipe/${id}`}>
			<Card className="transform border border-neutral-100 transition-all hover:shadow-md dark:border-neutral-700">
				<div className="flex h-20 gap-4">
					<div className="-m-4 mr-0 h-28 w-48">
						<RecipeImage
							imageSrc={imageSrc}
							emoji={emoji}
							className="h-28 w-48 rounded-l object-cover"
						/>
					</div>
					<div className="flex w-full flex-col gap-2">
						<span className="line-clamp-1 text-lg font-semibold text-amber-700 dark:text-amber-400 sm:text-xl">
							{name}
						</span>
						<T className="line-clamp-2 text-sm">{description}</T>
					</div>
				</div>
			</Card>
		</Link>
	);
}

export default RecipeCard;
export { RecipeCardLandscape };
