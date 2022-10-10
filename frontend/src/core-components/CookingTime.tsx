import React from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import RecipeStat from 'core-components/RecipeStat';
import T from 'core-components/T';

const CookingTIme = ({ cookingTime }: { cookingTime: string }) => (
  <RecipeStat>
    <HiOutlineClock size={28} className="dark:text-neutral-200" />
    <T className="text-sm font-semibold">{cookingTime}</T>
  </RecipeStat>
);

export default CookingTIme;
