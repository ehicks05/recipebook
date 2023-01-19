/* eslint-disable react/button-has-type */
import React from "react";
import { FaSpinner } from "react-icons/fa";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: React.ReactNode;
}

const Button = ({ loading, className = "", children, ...props }: Props) => {
  return (
    <button
      type={props.type || "button"}
      disabled={props.disabled || loading}
      className={`rounded-sm border border-neutral-200 bg-neutral-100 px-3 py-2 shadow hover:border-neutral-300 hover:shadow-lg dark:border-neutral-500 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-400 ${
        props.disabled || loading ? "opacity-50" : ""
      } ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
        {loading && <FaSpinner className="animate-spin" />}
      </div>
    </button>
  );
};

export default Button;
