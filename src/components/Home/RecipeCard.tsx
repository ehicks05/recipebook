import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CookingTime, Difficulty, T } from "components/core";
import { defaultImage, emojiToImage } from "./constants";
import type { CompleteRecipe } from "server/api/routers/example";
import FavoriteButton from "components/Home/FavoriteButton";
import { useUser } from "@supabase/auth-helpers-react";

interface FooterProps {
  cookingTime: string;
  difficulty: number;
}

const Footer = ({ cookingTime, difficulty }: FooterProps) => (
  <footer className="flex w-fit gap-4 pt-4">
    <CookingTime cookingTime={cookingTime} />
    <Difficulty difficulty={difficulty} />
  </footer>
);

interface Props {
  recipe: CompleteRecipe;
}

const RecipeCard = ({
  recipe: { id, emoji, name, author, description, cookingTime, difficulty, imageSrc },
}: Props) => {
  const user = useUser();

  return (
    <Card className="transform border border-neutral-100 transition-all hover:shadow-md dark:border-neutral-700">
      <div className="flex h-96 flex-col gap-4">
        <div className="-m-4 mb-0 h-60">
          <Link href={`/recipe/${id}`}>
            {imageSrc && <Image
              className="h-60 w-full rounded-t object-cover"
              src={imageSrc}
              alt="recipe"
              height={480}
              width={600}
            />}
            {!imageSrc && <img
              className="h-60 w-full rounded-t object-cover"
              src={emojiToImage[emoji] || defaultImage}
              alt="recipe"
              height={480}
              width={600}
            />}
          </Link>
        </div>
        {/* title row */}
        <div className="flex items-start gap-2">
          <div className="w-full">
            <Link href={`/recipe/${id}`}>
              <div className="text-xl font-semibold text-amber-700 dark:text-amber-400">
                {name}
              </div>
              <div className="text-xs italic dark:text-neutral-200">
                {author.displayName}
              </div>
            </Link>
          </div>
          {user && <FavoriteButton className="-mr-2 -mt-9" recipeId={id} />}
        </div>
        <T className="line-clamp-2 text-sm">{description}</T>
      </div>

      <Footer cookingTime={cookingTime} difficulty={difficulty} />
    </Card>
  );
};

function RecipeCardLandscape({
  recipe: { id, emoji, name, description, imageSrc },
}: Props) {
  const user = useUser();

  return (
    <Card className="transform border border-neutral-100 transition-all hover:shadow-md dark:border-neutral-700">
      <div className="flex h-48 gap-4">
        <Link href={`/recipe/${id}`} className="relative -m-4 mr-0 h-56 w-full">
          {imageSrc && (
            <Image
              className="h-56 w-full rounded-l object-cover"
              src={imageSrc}
              alt="recipe"
              height={240}
              width={300}
            />
          )}
          {!imageSrc && (
            <img
              className="h-56 w-full rounded-l object-cover"
              src={emojiToImage[emoji] || defaultImage}
              alt="recipe"
              height={240}
              width={300}
            />
          )}
        </Link>
        {user && (
          <FavoriteButton className="absolute left-2 top-2" recipeId={id} />
        )}
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-start gap-2">
            <Link href={`/recipe/${id}`} className="w-full">
              <span className="line-clamp-3 text-lg font-semibold text-amber-700 dark:text-amber-400 sm:text-xl">
                {name}
              </span>
            </Link>
          </div>
          <T className="line-clamp-5 text-sm">{description}</T>
        </div>
      </div>
    </Card>
  );
}

function RecipeCardOld({
  recipe: { id, emoji, name, author, description, cookingTime, difficulty },
}: Props) {
  const user = useUser();

  return (
    <Card className="transform border border-neutral-100 transition-all hover:shadow-md dark:border-neutral-700">
      <div className="flex h-56 flex-col gap-4">
        {/* title row */}
        <div className="flex items-start gap-2">
          <figure className="h-16 w-16 pt-2 text-5xl">{emoji}</figure>
          <div className="w-full">
            <Link href={`/recipe/${id}`}>
              <div className="font-semibold dark:text-neutral-200">{name}</div>
              <div className="text-xs italic dark:text-neutral-200">
                {author.displayName}
              </div>
            </Link>
          </div>
          {user && <FavoriteButton recipeId={id} />}
        </div>
        <T className="text-sm line-clamp-5">{description}</T>
      </div>

      <Footer cookingTime={cookingTime} difficulty={difficulty} />
    </Card>
  );
}

export default RecipeCard;
export { RecipeCardLandscape, RecipeCardOld };
