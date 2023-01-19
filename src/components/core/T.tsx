import type { ReactNode } from "react";
import React from "react";

interface IProps {
  className?: string;
  children: ReactNode;
}

const T = ({ children, className = "" }: IProps) => {
  return (
    <span className={`dark:text-neutral-200 ${className}`}>{children}</span>
  );
};

export default T;
