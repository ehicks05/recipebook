import React, { useState } from 'react';
import { Button, Container, Hero, T } from 'core-components';
import { useFetchLdJsonRecipe } from 'hooks/recipes';

const RecipeImport = () => {
  const [url, setUrl] = useState('');
  const {
    isLoading,
    isError,
    error,
    data: recipe,
    refetch,
  } = useFetchLdJsonRecipe(url);

  return (
    <>
      <Hero title="Recipe Import" />
      <Container>
        <label>
          <T>Recipe URL: </T>
        </label>
        <input
          className="w-full"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Button onClick={() => refetch()}>Import</Button>
        <pre className="text-sm p-4 text-white">
          {JSON.stringify(recipe, null, 2)}
        </pre>
      </Container>
    </>
  );
};

export default RecipeImport;
