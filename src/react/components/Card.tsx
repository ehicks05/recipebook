import React, { FC } from 'react';

interface IProps {
  className?: string;
}

const Card: FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={`p-4 rounded-sm border border-gray-200 dark:border-gray-500 shadow dark:bg-gray-800 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
