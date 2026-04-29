"use client";

import { Link } from "@tanstack/react-router";
import { HiStar } from "react-icons/hi";
import { Card, RecipeImage, T } from "@/components/core";
import { FavoriteButton } from "@/components/Home/FavoriteButton";
import type { Recipe } from "@/instant.types";
import { clientDb } from "@/lib/db";

interface Props {
	recipe: Recipe;
}

export const RecipeCard = ({
	recipe: {
		id,
		emoji,
		name,
		author,
		description,
		imageSrc,
		isFeatured,
		favoritedBy,
	},
}: Props) => {
	return (
		<Link to={"/recipes/$id"} params={{ id }} preload={false}>
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
							<div className="text-xl font-extrabold text-orange-700 dark:text-orange-400">
								{name}
							</div>
							<div className="text-sm dark:text-neutral-200">
								{author?.displayName}
							</div>
						</div>

						<clientDb.SignedIn>
							<FavoriteButton
								className="-mr-2 -mt-9"
								recipeId={id}
								favoritedBy={favoritedBy}
							/>
						</clientDb.SignedIn>
					</div>
					<T className="line-clamp-2 text-sm">{description}</T>
				</div>
			</Card>
		</Link>
	);
};
