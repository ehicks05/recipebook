import React from "react";
import Hero from "../../components/Hero";
import { IRecipe } from "../../types/types";
import RecipePicker from "./components/RecipePicker";

interface IProps {
  recipes: IRecipe[]
}

function Home({ recipes }: IProps) {
  if (!recipes) return <Hero title="Loading..." />;

  return (
    <>
      <Hero title="Find a Recipe" />
      <section className="section">
        <div className={"container"}>
          <RecipePicker recipes={recipes} />
        </div>
      </section>
    </>
  );
}

export default Home;
