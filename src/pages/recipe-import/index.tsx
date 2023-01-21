import { type NextPage } from "next";
import { api } from "utils/api";
import { Container, Loading, T } from "components/core";
import Recipe from "components/Recipe/Recipe";
import { useRouter } from "next/router";
import { parseLdJsonRecipe } from "utils/recipe-import";

const RecipePage: NextPage = () => {
  const router = useRouter();
  const { url } = router.query;

  const {
    isFetching,
    error,
    data: recipeHtml,
  } = api.example.importRecipe.useQuery(
    { url: url as string },
    { enabled: url && url.length > 4 ? true : false }
  );

  const handleChange = (url: string) => {
    void router.push(`recipe-import?url=${url}`);
    return null;
  };

  const recipe = parseLdJsonRecipe(recipeHtml || "");

  return (
    <>
      <Container>
        <input
          className="w-64 rounded px-2 py-1.5 dark:bg-neutral-700 dark:text-neutral-100 sm:w-96"
          placeholder="enter a recipe url"
          value={url}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Container>
      {error && (
        <Container>
          <T>{error.message}</T>
        </Container>
      )}
      {isFetching && <Loading />}
      {recipe && <Recipe recipe={recipe} />}
      {/* <pre className="text-sm p-4 text-white">
        {JSON.stringify(recipe, null, 2)}
      </pre> */}
    </>
  );
};

export default RecipePage;
