import { type NextPage } from "next";

import { Container, Hero } from "components/core";
import RecipePickerWrapper from "components/Home/RecipePicker";
import RecipeOfTheDay from "components/Home/RecipeOfTheDay";

const Home: NextPage = () => {
  return (
    <>
      {/* <Hero title="Recipe of the Day" />
      <Container>
        <RecipeOfTheDay />
      </Container> */}
      <Hero title="Find a Recipe" />
      <Container>
        <RecipePickerWrapper />
      </Container>
    </>
  );
};

export default Home;
