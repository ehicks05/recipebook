import { api } from 'trpc/server';

export async function GET(req: Request) {
	const recipes = await api.example.findRecipes();
	return Response.json(recipes);
}
