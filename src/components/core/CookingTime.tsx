import React from "react";
import { HiOutlineClock } from "react-icons/hi";
import { RecipeStat, T } from "./";

const CookingTIme = ({ cookingTime }: { cookingTime: string }) => (
  <RecipeStat>
    <HiOutlineClock size={24} className="dark:text-neutral-200" />
    <T className="text-sm font-semibold">{cookingTime}</T>
  </RecipeStat>
);

export default CookingTIme;
