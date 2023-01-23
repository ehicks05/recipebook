import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import type { IconType } from "react-icons";
import { T } from "components/core";
import type { FieldError, UseFormRegister } from "react-hook-form";

export interface IMyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: JSX.Element;
  containerClassName?: string;
  register: UseFormRegister;
  name: string;
  error?: FieldError;
}

const MyInput = ({
  className = "",
  label,
  leftIcon,
  containerClassName = "",
  register,
  name,
  error,
  ...props
}: IMyInputProps) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label className="" htmlFor={props.id || props.name}>
          <T>{label}</T>
        </label>
      )}
      <div>
        <input
          type={props.type || "text"}
          className={`w-full rounded px-2 py-1.5 dark:bg-neutral-700 dark:text-neutral-100 ${className} ${
            error ? "border-l-8 border-red-600" : ""
          }`}
          {...register(name)}
          // {...props}
        />
        {leftIcon && <span className="">{leftIcon}</span>}
        {error ? (
          <div className="text-sm text-red-600">{error.message}</div>
        ) : null}
      </div>
    </div>
  );
};

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  LeftIcon?: IconType;
}

const Input = ({ className = "", LeftIcon, ...props }: IInputProps) => {
  return (
    <div
      className={`flex w-full items-center dark:bg-neutral-700 dark:text-neutral-100 ${className}`}
    >
      {LeftIcon && (
        <div className="p-2">
          <LeftIcon className="text-lg text-neutral-400" />
        </div>
      )}
      <input
        type={props.type || "text"}
        className={`w-full border-none dark:bg-neutral-700 dark:text-neutral-100 ${className}`}
        {...props}
      />
    </div>
  );
};

interface IMyHiddenInputProps {
  id?: string;
  name: string;
}

const MyHiddenInput = ({ ...props }: IMyHiddenInputProps) => {
  const field = {};
  return <input type="hidden" {...field} {...props} />;
};

interface IMyTextAreaProps {
  // extends React.TextareaHTMLAttributes<HTMLTextAreaElement>
  id?: string;
  name: string;
  label?: string;
  placeholder: string;
  error?: any;
}

const MyTextArea = ({ label, error, ...props }: IMyTextAreaProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="" htmlFor={props.id || props.name}>
          <T>{label}</T>
        </label>
      )}
      <div className="">
        <TextareaAutosize
          className={`w-full rounded px-2 py-1.5 dark:bg-neutral-700 dark:text-neutral-100 ${
            error ? "border-l-8 border-red-600" : ""
          }`}
          rows={1}
        />
        {error ? (
          <div className="-mt-1 text-sm text-red-600">{error}</div>
        ) : null}
      </div>
    </div>
  );
};

interface IMySelectProps {
  id?: string;
  name: string;
  label?: string;
  children: JSX.Element | JSX.Element[];
  error?: any;
}

const MySelect = ({ label, error, ...props }: IMySelectProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="" htmlFor={props.id || props.name}>
          <T>{label}</T>
        </label>
      )}
      <div className="">
        <div className="">
          <select
            className={`w-full rounded px-2 py-1.5 dark:bg-neutral-700 dark:text-neutral-100 ${
              error ? "border-l-8 border-red-600" : ""
            }`}
          >
            {props.children}
          </select>
        </div>
        {error ? <div className="text-sm text-red-600">{error}</div> : null}
      </div>
    </div>
  );
};

export { Input, MyInput, MyHiddenInput, MyTextArea, MySelect };
