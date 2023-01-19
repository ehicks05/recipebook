import React from "react";

const RecipeStat = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full items-center justify-center gap-2 rounded bg-neutral-100 px-4 py-2 dark:bg-neutral-700">
    {children}
  </div>
);

export default RecipeStat;
