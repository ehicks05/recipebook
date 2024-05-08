import type { NextPage } from 'next';

import RecipePickerWrapper from 'components/Home/RecipePicker';
import { Container, Hero } from 'components/core';

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
