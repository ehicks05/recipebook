import React from 'react';
import { IDirection, IIngredient, IRecipe } from '../../types/types';

const UNITS = ['oz', 'lb', 'ml', 'L', 'g'];
const UNIT_OPTIONS = ['', ...UNITS].map(unit => (
  <option value={unit}>{unit}</option>
));

const DEFAULT_INGREDIENT: IIngredient = {
  name: '',
  quantity: '',
  unit: '',
};
const DEFAULT_DIRECTION: IDirection = { index: '0', text: '' };
const DEFAULT_RECIPE: IRecipe = {
  name: '',
  description: '',
  emoji: ':)',
  difficulty: 1,
  cookingTime: '',
  servings: 1,
  course: '',
  author: { id: 0, username: 'unknown', displayName: 'Unknown' },
  createdBy: 0,
  ingredients: [DEFAULT_INGREDIENT],
  directions: [DEFAULT_DIRECTION],
};

export {
  UNITS,
  UNIT_OPTIONS,
  DEFAULT_INGREDIENT,
  DEFAULT_DIRECTION,
  DEFAULT_RECIPE,
};
