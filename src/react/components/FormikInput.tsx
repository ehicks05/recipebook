import React from 'react';
import { useField } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';

export interface IMyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: JSX.Element;
  grow?: boolean;
}

const MyInput = ({
  className,
  label,
  leftIcon,
  grow,
  ...props
}: IMyInputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={`${grow ? 'flex-grow' : ''}`}>
      {label && (
        <label className="" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <div>
        <input
          type={props.type || 'text'}
          className={`${grow ? 'w-full' : ''} ${className} ${
            meta.touched && meta.error ? 'border-red-600' : ''
          }`}
          {...field}
          {...props}
        />
        {leftIcon && <span className="">{leftIcon}</span>}
        {meta.touched && meta.error ? (
          <div className="text-red-600">{meta.error}</div>
        ) : null}
      </div>
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
  id?: string;
  name: string;
  label?: string;
  placeholder: string;
}

const MyTextArea = ({ label, ...props }: IMyTextAreaProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <div className="control">
        <TextareaAutosize
          className={`${meta.touched && meta.error ? 'is-danger' : ''}`}
          rows={1}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="help is-danger">{meta.error}</div>
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
    <div className="field">
      {label && (
        <label className="label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <div className="control">
        <div className="">
          <select {...field} {...props}>
            {props.children}
          </select>
        </div>
        {meta.touched && meta.error ? (
          <div className="help is-danger">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export { MyInput, MyHiddenInput, MyTextArea, MySelect };
