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
  createdAt?: Date;
  updatedAt?: Date;
}

interface IIngredient {
  id?: number;
  index: string;
  name: string;
  quantity: string;
  unit: string;
}

interface IDirection {
  id?: number;
  index: string;
  text: string;
}

interface IUser {
  id: number;
  username: string;
  displayName: string;
}

interface IEmoji {
  character: string;
  codePoint: string;
  group: string;
  unicodeName: string;
  slug: string;
  subGroup: string;
}

interface IFavorite {
  id: number;
  user: IUser;
  recipe: IRecipe;
}

export type { IRecipe, IIngredient, IDirection, IUser, IEmoji, IFavorite };
