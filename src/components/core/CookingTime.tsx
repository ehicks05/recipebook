import React from "react";
import { HiOutlineClock } from "react-icons/hi";
import { Button, T } from "./";

const CookingTIme = ({ cookingTime }: { cookingTime: string }) => (
  <Button isStatic>
    <HiOutlineClock size={24} className="dark:text-neutral-200" />
    <T className="text-sm font-semibold">{cookingTime}</T>
  </Button>
);

export default CookingTIme;
