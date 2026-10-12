import type { User } from 'better-auth';
import { Container, Hero } from '@/components/core';
import { RecipeList } from '@/features/Account/RecipeList';
import type { Recipe, UserFavorite } from '@/functions/recipes';

const YourLists = ({ recipes, favorites }: Props) => {
	return (
		<Container>
			<div className="flex flex-col gap-4">
				<RecipeList recipes={recipes} title="My Recipes" />
				<RecipeList recipes={favorites} title="My Favorites" />
			</div>
		</Container>
	);
};

interface Props {
	user: User;
	recipes: Recipe[];
	favorites: UserFavorite[];
}

export const Account = ({ user, recipes, favorites }: Props) => {
	const createdAt = user.createdAt
		? new Date(user.createdAt).toLocaleDateString()
		: undefined;
	const subtitle = createdAt
		? `${user.name || 'New User'} Joined ${createdAt}`
		: undefined;

	return (
		<>
			<Hero title="Account" subtitle={subtitle} />
			<YourLists user={user} recipes={recipes} favorites={favorites} />
		</>
	);
};
