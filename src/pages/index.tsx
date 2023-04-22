import { type NextPage } from "next";

import { Container, Hero } from "components/core";
import RecipePickerWrapper from "components/Home/RecipePicker";

const Home: NextPage = () => {
  return (
    <>
      <Hero title="Find a Recipe" />
      <Container>
        <RecipePickerWrapper />
      </Container>
    </>
  );
};

export default Home;
