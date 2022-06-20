import React from 'react';
import * as Yup from 'yup';
import { IDirection, IIngredient, IRecipe } from '../../types/types';
import { validateQuantity } from './utils';

const UNITS = ['tsp', 'tbsp', 'cup', 'oz', 'lb', 'ml', 'L', 'g'];
const UNIT_OPTIONS = ['', ...UNITS].map(unit => (
  <option value={unit}>{unit}</option>
));

const DEFAULT_INGREDIENT: IIngredient = {
  index: '0',
  name: '',
  quantity: '',
  unit: '',
};
const DEFAULT_DIRECTION: IDirection = { index: '0', text: '' };
const DEFAULT_RECIPE: IRecipe = {
  name: '',
  description: '',
  emoji: '\uD83E\uDD58',
  difficulty: 1,
  cookingTime: '',
  servings: 1,
  course: '',
  author: { id: '', username: 'unknown', displayName: 'Unknown' },
  ingredients: [DEFAULT_INGREDIENT],
  directions: [DEFAULT_DIRECTION],
};

const RECIPE_SCHEMA = Yup.object({
  name: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  description: Yup.string().required('Required'),
  cookingTime: Yup.number().min(1, 'Must be at least 1').required('Required'),
  servings: Yup.number()
    .min(1, 'Must be 1 serving or more')
    .required('Required'),
  emoji: Yup.string(),
  difficulty: Yup.number().required('Required'),
  ingredients: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Required'),
        quantity: Yup.string()
          .test('is-valid-quantity', 'Must be a valid number', validateQuantity)
          .required('Required'),
        unit: Yup.string(),
      })
    )
    .required('Required'),
  directions: Yup.array()
    .of(
      Yup.object({
        index: Yup.number().required('Required'),
        text: Yup.string().required('Required'),
      })
    )
    .required('Required'),
});

export {
  UNITS,
  UNIT_OPTIONS,
  DEFAULT_INGREDIENT,
  DEFAULT_DIRECTION,
  DEFAULT_RECIPE,
  RECIPE_SCHEMA,
};
