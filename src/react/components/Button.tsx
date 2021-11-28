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
      className={`px-3 py-2 rounded-sm border border-gray-500 hover:border-gray-400 dark:bg-gray-700 dark:text-gray-200 ${
        loading ? 'opacity-50' : ''
      } ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {loading && <FaSpinner className="animate-spin" />}
      </div>
    </button>
  );
};

export default Button;
