import { IDirection, IIngredient, IRecipe } from '../../types/types';

const defaultIngredient: IIngredient = {
  name: '',
  quantity: '0',
  unit: '',
};
const defaultDirection: IDirection = { index: '', text: '' };
const defaultRecipe: IRecipe = {
  name: '',
  description: '',
  emoji: ':)',
  difficulty: 1,
  cookingTime: '1',
  servings: 1,
  course: '',
  author: { id: 0, username: 'unknown', displayName: 'Unknown' },
  createdBy: 0,
  ingredients: [defaultIngredient],
  directions: [defaultDirection],
};

export { defaultIngredient, defaultDirection, defaultRecipe };
