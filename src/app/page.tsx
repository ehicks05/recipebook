import RecipePicker from 'components/Home/RecipePicker';
import { Container, Hero } from 'components/core';
import { HydrateClient } from 'trpc/server';

export default async function Page() {
	return (
		<HydrateClient>
			<Hero title="Find a Recipe" />
			<Container>
				<RecipePicker />
			</Container>
		</HydrateClient>
	);
}
