import React from "react";
import Hero from "../../components/Hero";
import { IRecipe } from "../../types/types";
import RecipePicker from "./components/RecipePicker";

interface IProps {
  recipes: IRecipe[];
  favoriteIds: number[];
  fetchFavorites: () => void;
}

function Home({ recipes, favoriteIds, fetchFavorites }: IProps) {
  if (!recipes) return <Hero title="Loading..." />;

  return (
    <>
      <Hero title="Find a Recipe" />
      <section className="section">
        <div className={"container"}>
          <RecipePicker recipes={recipes} favoriteIds={favoriteIds} fetchFavorites={fetchFavorites} />
        </div>
      </section>
    </>
  );
}

export default Home;
