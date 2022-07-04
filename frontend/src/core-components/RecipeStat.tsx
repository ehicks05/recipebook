import React from 'react';

const RecipeStat = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-2 justify-center items-center w-full px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-700">
    {children}
  </div>
);

export default RecipeStat;
