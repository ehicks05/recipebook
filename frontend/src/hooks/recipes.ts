import { useQuery } from 'react-query';
import authFetch from 'helpers/authFetch';
import { IRecipe } from 'types/types';
import axios from 'axios';
import * as cheerio from 'cheerio';

const useFetchRecipes = () => {
  const path = '/api/recipes';
  const fetch = async () => authFetch(path);

  return useQuery<IRecipe[], Error>(path, fetch);
};

const useFetchRecipe = (id: string) => {
  const path = `/api/recipes/${id}`;
  const fetch = async () => authFetch(path);

  return useQuery<IRecipe, Error>(path, fetch);
};

const useFetchLdJsonRecipe = (url: string) => {
  const path = `/recipe-import/${url}`;

  const fetch = async () => {
    const result = await axios.get(url);
    const { data } = result;
    const $ = cheerio.load(data);
    const scriptTag = $('script')
      .get()
      .find(o => $(o).attr('type') === 'application/ld+json');
    const jsonString = scriptTag?.children[0].data;
    const json = JSON.parse(jsonString);
    const recipe = json['@graph'].find(o => o['@type'] === 'Recipe');
    console.log({ recipe });
    return recipe as any;
  };

  return useQuery<IRecipe, Error>(path, fetch, { enabled: !!url });
};

export { useFetchRecipes, useFetchRecipe, useFetchLdJsonRecipe };
