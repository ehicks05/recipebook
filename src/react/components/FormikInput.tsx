import React from 'react';
import { useField } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import { IconType } from 'react-icons';
import T from './T';

export interface IMyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: JSX.Element;
  containerClassName?: string;
}

const MyInput = ({
  className,
  label,
  leftIcon,
  containerClassName,
  ...props
}: IMyInputProps) => {
  const [field, meta] = useField({ ...props, name: props.name || '' });
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="" htmlFor={props.id || props.name}>
          <T>{label}</T>
        </label>
      )}
      <div>
        <input
          type={props.type || 'text'}
          className={`w-full dark:bg-neutral-700 dark:text-neutral-100 ${className} ${
            meta.touched && meta.error ? 'border-red-600' : ''
          }`}
          {...field}
          {...props}
        />
        {leftIcon && <span className="">{leftIcon}</span>}
        {meta.touched && meta.error ? (
          <div className="text-sm text-red-600">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  LeftIcon?: IconType;
}

const Input = ({ className, LeftIcon, ...props }: IInputProps) => {
  return (
    <div
      className={`flex items-center w-full dark:bg-neutral-700 dark:text-neutral-100 ${className}`}
    >
      {LeftIcon && (
        <div className="p-2">
          <LeftIcon className="text-lg text-neutral-400" />
        </div>
      )}
      <input
        type={props.type || 'text'}
        className={`w-full dark:bg-neutral-700 dark:text-neutral-100 border-none ${className}`}
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
  const [field] = useField(props);
  return <input type="hidden" {...field} {...props} />;
};

interface IMyTextAreaProps {
  // extends React.TextareaHTMLAttributes<HTMLTextAreaElement>
  id?: string;
  name: string;
  label?: string;
  placeholder: string;
}

const MyTextArea = ({ label, ...props }: IMyTextAreaProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full">
      {label && (
        <label className="" htmlFor={props.id || props.name}>
          <T>{label}</T>
        </label>
      )}
      <div className="">
        <TextareaAutosize
          className={`w-full dark:bg-neutral-700 dark:text-neutral-100 ${
            meta.touched && meta.error ? 'border-red-600' : ''
          }`}
          rows={1}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="-mt-1 text-sm text-red-600">{meta.error}</div>
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
}

const MySelect = ({ label, ...props }: IMySelectProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full">
      {label && (
        <label className="" htmlFor={props.id || props.name}>
          <T>{label}</T>
        </label>
      )}
      <div className="">
        <div className="">
          <select
            className="w-full dark:bg-neutral-700 dark:text-neutral-100"
            {...field}
            {...props}
          >
            {props.children}
          </select>
        </div>
        {meta.touched && meta.error ? (
          <div className="text-sm text-red-600">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export { Input, MyInput, MyHiddenInput, MyTextArea, MySelect };
