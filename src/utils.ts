import { IRecipe } from './react/types/types';

const DEFAULT_DESCRIPTION =
  'This is where a description would go...if we HAD one! ' +
  'It would tell you what you can expect from this recipe.';

const setDefaultDescription = (recipe: IRecipe) => ({
  ...recipe,
  description: recipe.description || DEFAULT_DESCRIPTION,
});

const setDefaultId = (recipe: IRecipe, id: number) => ({
  ...recipe,
  id,
});

const setDefaultAuthor = (recipe: IRecipe) => ({
  ...recipe,
  author: recipe.author || { id: 1, username: 'admin', displayName: 'adminGuy' },
});

export { setDefaultDescription, setDefaultAuthor, setDefaultId };
