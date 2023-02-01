import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { T } from "components/core";
import type { FieldError, UseFormRegister } from "react-hook-form";

export interface IMyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: JSX.Element;
  containerClassName?: string;
  name?: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
}

/**
 * Use with react-hook-form. Includes the label and error ui.
 */
const MyInput = ({
  name = "",
  className = "",
  label,
  leftIcon,
  containerClassName = "",
  register,
  error,
  ...props
}: IMyInputProps) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label className="" htmlFor={props.id || name}>
          <T>{label}</T>
        </label>
      )}
      <div>
        <input
          type={props.type || "text"}
          className={`w-full rounded bg-neutral-100 px-2 py-1.5 dark:bg-neutral-700 dark:text-neutral-100 ${className} ${
            error ? "border-l-8 border-red-600" : ""
          }`}
          {...(register &&
            register(name, { valueAsNumber: props.type === "number" }))}
          {...props}
        />
        {leftIcon && <span className="">{leftIcon}</span>}
        {error && <div className="text-sm text-red-600">{error.message}</div>}
      </div>
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
  id?: string;
  name?: string;
  label?: string;
  placeholder: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
}

const MyTextArea = ({
  label,
  register,
  error,
  name = "",
  ...props
}: IMyTextAreaProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="" htmlFor={props.id || name}>
          <T>{label}</T>
        </label>
      )}
      <div className="">
        <TextareaAutosize
          placeholder={props.placeholder}
          className={`w-full rounded bg-neutral-100 px-2 py-1.5 dark:bg-neutral-700 dark:text-neutral-100 ${
            error ? "border-l-8 border-red-600" : ""
          }`}
          rows={1}
          {...(register && register(name))}
        />
        {error && (
          <div className="-mt-1 text-sm text-red-600">{error.message}</div>
        )}
      </div>
    </div>
  );
};

interface IMySelectProps {
  id?: string;
  name?: string;
  label?: string;
  children: JSX.Element | JSX.Element[];
  register?: UseFormRegister<any>;
  error?: FieldError;
}

const MySelect = ({
  label,
  register,
  error,
  name = "",
  ...props
}: IMySelectProps) => {
  return (
    <div className={`flex min-w-fit flex-col gap-1`}>
      {label && (
        <label className="" htmlFor={props.id || name}>
          <T>{label}</T>
        </label>
      )}
      <select
        {...(register && register(name))}
        className={`w-full rounded border-r-8 border-neutral-100 bg-neutral-100 px-2 py-2  dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 ${
          error ? "border-l-8 border-red-600" : ""
        }`}
      >
        {props.children}
      </select>
      {error && <div className="text-sm text-red-600">{error.message}</div>}
    </div>
  );
};

export { MyInput, MyHiddenInput, MyTextArea, MySelect };
