/* eslint-disable react/button-has-type */
import React, { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: React.ReactNode;
}

const Button: FC<IProps> = ({
  loading,
  className,
  children,
  ...props
}: IProps) => {
  return (
    <button
      type={props.type || 'button'}
      disabled={props.disabled || loading}
      className={`px-3 py-2 rounded-sm border border-neutral-500 hover:border-neutral-400 dark:bg-neutral-700 dark:text-neutral-200 ${
        props.disabled || loading ? 'opacity-50' : ''
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
