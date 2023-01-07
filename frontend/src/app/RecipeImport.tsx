import React, { useState } from 'react';
import { Container, Loading, T } from 'core-components';
import { useFetchLdJsonRecipe } from 'hooks/recipe-import';
import Recipe from './Recipe/Recipe';

const RecipeImport = () => {
  const [url, setUrl] = useState('');
  const { isLoading, error, data: recipe } = useFetchLdJsonRecipe(url);

  return (
    <>
      <Container>
        <input
          className="px-2 py-1.5 w-full rounded dark:bg-neutral-700 dark:text-neutral-100"
          placeholder="enter a recipe url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </Container>
      {error && (
        <Container>
          <T>{error.message}</T>
        </Container>
      )}
      {isLoading && <Loading />}
      {recipe && <Recipe recipe={recipe} />}
      {/* <pre className="text-sm p-4 text-white">
        {JSON.stringify(recipe, null, 2)}
      </pre> */}
    </>
  );
};

export default RecipeImport;
