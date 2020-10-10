interface IRecipe {
  id?: number;
  name: string;
  description: string;
  emoji: string;
  servings: number;
  cookingTime: string;
  difficulty: number;
  course: string;
  ingredients: IIngredient[];
  directions: IDirection[];
  author: IUser;
}

interface IIngredient {
  name: string;
  quantity: string;
  unit: string;
}

interface IDirection {
  index: string;
  text: string;
}

interface IUser {
  username: string;
}

export type { IRecipe, IIngredient, IDirection, IUser };
