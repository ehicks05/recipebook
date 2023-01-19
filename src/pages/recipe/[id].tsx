import { type NextPage } from "next";
import { api } from "utils/api";
import { Hero } from "components/core";
import Recipe from "components/Recipe/Recipe";
import { useRouter } from "next/router";

const RecipePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    isLoading,
    error,
    data: recipe,
  } = api.example.findRecipe.useQuery({ id: id as string });

  if (recipe) return <Recipe recipe={recipe} />;
  if (isLoading) return <Hero title="Loading..." />;
  if (error) return <Hero title="Error..." subtitle={error.message} />;
  return <Hero title="Recipe not found" />;
};

export default RecipePage;
