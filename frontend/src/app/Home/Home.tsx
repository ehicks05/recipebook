import React from 'react';
import { Container, Hero } from 'core-components';
import { useFetchRecipes } from 'hooks/recipes';
import RecipePicker from './components/RecipePicker';

function Home() {
  const { isLoading, isError, error, data: recipes } = useFetchRecipes();

  if (isLoading) return <Hero title="Loading..." />;
  if (isError) return <Hero title="Error..." subtitle={error.message} />;
  if (!recipes) return <Hero title="Recipes not found" />;

  return (
    <>
      <Hero title="Find a Recipe" />
      <Container>
        <RecipePicker recipes={recipes} />
      </Container>
    </>
  );
}

export default Home;
