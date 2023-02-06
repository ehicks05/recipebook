import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { T } from "components/core";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import clsx from "clsx";

const BASE =
  "w-full rounded border-neutral-100 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-100";

// https://github.com/react-hook-form/react-hook-form/discussions/4426#discussioncomment-623148
export interface IMyInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: JSX.Element;
  containerClassName?: string;
  name?: string;
  register?: UseFormRegister<T>;
  error?: FieldError;
}

/**
 * Includes the label and error ui. Works with react-hook-form.
 */
const MyInput = <T extends FieldValues>({
  name = "",
  className = "",
  label,
  leftIcon,
  containerClassName = "",
  disabled,
  register,
  error,
  ...props
}: IMyInputProps<T>) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label htmlFor={props.id || name}>
          <T>{label}</T>
        </label>
      )}
      <div>
        <input
          disabled={disabled}
          type={props.type || "text"}
          className={clsx(BASE, className, {
            "outline outline-red-600": error,
            "cursor-not-allowed": disabled,
          })}
          {...(register &&
            // as Path<T>: https://github.com/react-hook-form/documentation/issues/670
            register(name as Path<T>, {
              valueAsNumber: props.type === "number",
            }))}
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

interface IMyTextAreaProps<T extends FieldValues> {
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  register?: UseFormRegister<T>;
  error?: FieldError;
}

const MyTextArea = <T extends FieldValues>({
  label,
  disabled,
  register,
  error,
  name = "",
  ...props
}: IMyTextAreaProps<T>) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={props.id || name}>
          <T>{label}</T>
        </label>
      )}
      <div>
        <TextareaAutosize
          disabled={disabled}
          placeholder={props.placeholder}
          className={clsx(BASE, {
            "outline outline-red-600": error,
            "cursor-not-allowed": disabled,
          })}
          rows={1}
          {...(register && register(name as Path<T>))}
        />
        {error && (
          <div className="-mt-1 text-sm text-red-600">{error.message}</div>
        )}
      </div>
    </div>
  );
};

interface IMySelectProps<T extends FieldValues> {
  id?: string;
  name?: string;
  label?: string;
  type?: "number";
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
  register?: UseFormRegister<T>;
  error?: FieldError;
}

const MySelect = <T extends FieldValues>({
  label,
  type,
  disabled,
  register,
  error,
  name = "",
  ...props
}: IMySelectProps<T>) => {
  return (
    <div className={`flex min-w-fit flex-col gap-1`}>
      {label && (
        <label htmlFor={props.id || name}>
          <T>{label}</T>
        </label>
      )}
      <select
        disabled={disabled}
        {...(register &&
          register(name as Path<T>, { valueAsNumber: type === "number" }))}
        className={clsx(BASE, { "outline outline-red-600": error })}
      >
        {props.children}
      </select>
      {error && <div className="text-sm text-red-600">{error.message}</div>}
    </div>
  );
};

export { MyInput, MyHiddenInput, MyTextArea, MySelect };
