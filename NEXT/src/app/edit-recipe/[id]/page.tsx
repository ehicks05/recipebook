import { RecipeForm } from 'components/RecipeForm';
import { notFound } from 'next/navigation';
import React from 'react';
import { api } from 'trpc/server';

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
	const { id } = await params;

	const recipe = await api.example.findRecipe({
		id: (id as string) || '',
	});

	if (!recipe) return notFound();
	return <RecipeForm recipe={recipe} />;
}
