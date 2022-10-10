import React from 'react';
import { Container, Hero } from 'core-components';
import RecipePicker from './components/RecipePicker';

const Home = () => {
  return (
    <>
      <Hero title="Find a Recipe" />
      <Container>
        <RecipePicker />
      </Container>
    </>
  );
};

export default Home;
