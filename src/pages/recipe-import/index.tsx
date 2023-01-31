import { type NextPage } from "next";
import { api } from "utils/api";
import { Alert, Container, Loading, T } from "components/core";
import Recipe from "components/Recipe/Recipe";
import { useRouter } from "next/router";
import { parseLdJsonRecipe } from "utils/recipe-import";
import { MyInput } from "components/RecipeForm/components/StyledInputs";

const RecipeImportPage: NextPage = () => {
  const router = useRouter();
  const { url } = router.query;

  const {
    isFetching,
    error,
    data: recipeHtml,
  } = api.example.importRecipe.useQuery(
    { url: url as string },
    {
      enabled: url && url.length > 4 ? true : false,
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    }
  );

  const handleChange = (url: string) => {
    void router.push(`recipe-import?url=${url}`);
    return null;
  };

  const recipe = parseLdJsonRecipe(recipeHtml || "");

  return (
    <>
      <Alert variant="info" title="What is this?">
        <div className="max-w-prose">
          On this page, you can enter a recipe from the web, and if it includes
          web-friendly metadata, you will be able to see it here.
        </div>
      </Alert>
      <Container>
        <MyInput
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
      {(error || (url && !recipeHtml)) && (
        <div className="m-3">
          <Alert
            variant="error"
            title={`Unable to fetch recipe`}
            description={""}
          />
        </div>
      )}
      {recipeHtml && !recipe && (
        <div className="m-3">
          <Alert
            variant="error"
            title={`Unable to parse recipe`}
            description={""}
          />
        </div>
      )}
      {/* <pre className="text-sm p-4 text-white">
        {JSON.stringify(recipe, null, 2)}
      </pre> */}
    </>
  );
};

export default RecipeImportPage;
