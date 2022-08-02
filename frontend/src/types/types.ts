interface IRecipe {
  id?: string;
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
  id?: string;
  index: string;
  name: string;
  quantity: string;
  unit: string;
}

interface IDirection {
  id?: string;
  index: number;
  text: string;
}

interface IUser {
  id: string;
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
  id: string;
  user: IUser;
  recipe: IRecipe;
}

export type { IRecipe, IIngredient, IDirection, IUser, IEmoji, IFavorite };
