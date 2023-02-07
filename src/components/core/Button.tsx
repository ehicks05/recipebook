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

const baseClasses = `rounded border border-transparent`;

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
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 rounded bg-black opacity-30"></div>
        )}
        <div
          className={clsx("flex items-center justify-center gap-2 px-3 py-2", {
            "opacity-50": disabled || loading,
          })}
        >
          {children}
        </div>
        {loading && (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <FaSpinner size={20} className="animate-spin" />
          </div>
        )}
      </div>
    </button>
  );
};

export default Button;
