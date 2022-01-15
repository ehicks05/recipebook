import React from 'react';
import Container from '../../components/Container';
import Hero from '../../components/Hero';
import { IRecipe } from '../../types/types';
import RecipePicker from './components/RecipePicker';

interface IProps {
  recipes: IRecipe[];
}

function Home({ recipes }: IProps) {
  if (!recipes) return <Hero title="Loading..." />;

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
