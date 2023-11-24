import React from "react";
import Link from "next/link";
import { Card, RecipeImage, T } from "components/core";
import type { CompleteRecipe } from "server/api/routers/example";
import FavoriteButton from "components/Home/FavoriteButton";
import { useUser } from "@supabase/auth-helpers-react";
import { HiOutlineClock } from "react-icons/hi";
import { DIFFICULTIES } from "components/core/Difficulty";

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
  const user = useUser();

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
          </div>
          {/* title row */}
          <div className="flex items-start gap-2">
            <div className="w-full">
              <div className="text-xl font-semibold text-amber-700 dark:text-amber-400">
                {name}
              </div>
              <div className="text-xs dark:text-neutral-200">
                {author.displayName} |{" "}
                {DIFFICULTIES[difficulty]?.label || "easy"} |{" "}
                <HiOutlineClock
                  size={16}
                  className="inline dark:text-neutral-200"
                />{" "}
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
  const user = useUser();

  return (
    <Link href={`/recipe/${id}`}>
      <Card className="transform border border-neutral-100 transition-all hover:shadow-md dark:border-neutral-700">
        <div className="flex h-48 gap-4">
          <div className="-m-4 mr-0 h-56 w-full">
            <RecipeImage
              imageSrc={imageSrc}
              emoji={emoji}
              className="h-56 w-full rounded-l object-cover"
            />
          </div>
          {user && (
            <FavoriteButton className="absolute left-2 top-2" recipeId={id} />
          )}
          <div className="flex w-full flex-col gap-4">
            <span className="line-clamp-3 text-lg font-semibold text-amber-700 dark:text-amber-400 sm:text-xl">
              {name}
            </span>
            <T className="line-clamp-5 text-sm">{description}</T>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default RecipeCard;
export { RecipeCardLandscape };
