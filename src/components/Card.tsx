import React, { ReactNode } from 'react';

interface IProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ children, className }: IProps) => {
  return (
    <div
      className={`p-4 rounded-sm border border-neutral-200 dark:border-neutral-700 shadow-md dark:bg-neutral-800 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
