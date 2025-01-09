'use client';

import { useAuth } from '@clerk/nextjs';
import FavoriteButton from 'components/Home/FavoriteButton';
import { Card, RecipeImage, T } from 'components/core';
import { DIFFICULTIES } from 'components/core/Difficulty';
import Link from 'next/link';
import React from 'react';
import { HiOutlineClock, HiStar } from 'react-icons/hi';
import type { CompleteRecipe } from 'server/db-api';

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
		isFeatured,
		userFavorites,
	},
}: Props) => {
	const { userId } = useAuth();

	return (
		<Link href={`/recipe/${id}`}>
			<Card className="transform transition-all hover:shadow-md border border-neutral-100 dark:border-neutral-800">
				<div className="flex h-80 flex-col gap-4">
					<div className="-m-4 mb-0 h-48">
						<div className="h-48 w-full rounded-t bg-neutral-50 dark:bg-[#1C1C1C] text-neutral-400 dark:text-neutral-700">
							<RecipeImage
								imageSrc={imageSrc}
								emoji={emoji}
								className="h-48 rounded-t"
							/>
						</div>
						{isFeatured && (
							<div
								title="Recipe of the day"
								className="flex gap-2 items-center p-2 rounded bg-neutral-200 dark:bg-neutral-700 dark:text-white absolute top-2 right-2 shadow-xl"
							>
								<HiStar className="text-yellow-400" />
							</div>
						)}
					</div>
					{/* title row */}
					<div className="flex items-start gap-2">
						<div className="w-full">
							<div className="text-xl font-semibold text-orange-700 dark:text-orange-400">
								{name}
							</div>
							<div className="text-xs dark:text-neutral-200">
								{author.displayName} | {DIFFICULTIES[difficulty]?.label || 'easy'} |{' '}
								<HiOutlineClock size={16} className="inline dark:text-neutral-200" />{' '}
								{cookingTime}
							</div>
						</div>
						{userId && (
							<FavoriteButton
								className="-mr-2 -mt-9"
								recipeId={id}
								isUserFavorite={userFavorites.length !== 0}
							/>
						)}
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
			<Card className="transform border border-neutral-100 dark:border-neutral-800 transition-all hover:shadow-md">
				<div className="flex h-20 gap-4">
					<div className="-m-4 mr-0 h-28 w-48 rounded-l bg-neutral-50 dark:bg-[#1C1C1C] text-neutral-400 dark:text-neutral-700">
						<RecipeImage
							imageSrc={imageSrc}
							emoji={emoji}
							className="h-28 w-48 rounded-l"
						/>
					</div>
					<div className="flex w-full flex-col gap-2">
						<span className="line-clamp-1 text-lg font-semibold text-orange-700 dark:text-orange-400 sm:text-xl">
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
