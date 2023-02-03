/* eslint-disable react/button-has-type */
import clsx from "clsx";
import React from "react";
import { FaSpinner } from "react-icons/fa";

const VARIANTS = {
  default: clsx(`bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200`),
  error: clsx(`text-white bg-red-600 dark:bg-red-800`),
} as const;

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  loading?: boolean;
  children?: React.ReactNode;
  isStatic?: boolean;
}

const baseClasses = `rounded-sm border border-transparent py-2 px-3`;

const Button = ({
  variant = "default",
  loading,
  className = "",
  children,
  type = "button",
  disabled,
  isStatic,
  ...props
}: Props) => {
  const variantClasses = VARIANTS[variant];
  const conditionalClasses = {
    "opacity-50": disabled || loading,
    "hover:border-neutral-300 dark:hover:border-neutral-500 shadow":
      !disabled && !isStatic,
  };

  return (
    <button
      type={type}
      disabled={disabled || isStatic || loading}
      className={clsx(
        baseClasses,
        conditionalClasses,
        variantClasses,
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
