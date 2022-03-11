import React, { FC } from 'react';

interface IProps {
  className?: string;
}

const T: FC<IProps> = ({ children, className }) => {
  return (
    <span className={`dark:text-neutral-200 ${className}`}>{children}</span>
  );
};

export default T;
