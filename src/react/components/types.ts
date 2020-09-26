export interface IRecipe {
  id?: number;
  name: string;
  description: string;
  emoji: string;
  servings: number;
  cookingTime: string;
  difficulty: number;
  ingredients: IIngredient[];
  directions: IDirection[];
}

export interface IIngredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface IDirection {
  index: string;
  text: string;
}

export interface IUser {
  fullName: string;
}