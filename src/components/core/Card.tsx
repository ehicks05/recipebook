import type { ReactNode } from "react";
import React from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Card = ({ children, className = "" }: Props) => {
  return (
    <div className={`rounded p-4 shadow-md dark:bg-neutral-800 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
