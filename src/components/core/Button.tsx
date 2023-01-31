/* eslint-disable react/button-has-type */
import clsx from "clsx";
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
      className={clsx(
        `rounded-sm border border-transparent bg-neutral-100 py-2 px-3 shadow`,
        "dark:bg-neutral-700 dark:text-neutral-200",
        {
          "opacity-50": props.disabled || loading,
          "hover:border-neutral-300 dark:hover:border-neutral-500":
            !props.disabled,
        },
        className
      )}
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
