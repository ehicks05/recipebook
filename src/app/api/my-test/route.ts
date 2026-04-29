import { api } from 'trpc/server';

export async function GET(req: Request) {
	const recipes = await api.example.findRecipes({ terms: ['sweet potato kale'] });
	return Response.json(recipes);
}
