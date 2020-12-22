import { IRecipe } from './react/types/types';

const DEFAULT_DESCRIPTION =
  'This is where a description would go...if we HAD one! ' +
  'It would tell you what you can expect from this recipe.';

const setDefaultDescription = (recipe: IRecipe) => ({
  ...recipe,
  description: recipe.description || DEFAULT_DESCRIPTION,
});

export default setDefaultDescription;
