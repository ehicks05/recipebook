import React from 'react';
import { useField } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';

interface IMyInputProps {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  isExpanded?: boolean;
  leftIcon?: JSX.Element;
  [x: string]: any;
}

const MyInput = ({ label, leftIcon, ...props }: IMyInputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <div
        className={`control ${props.isExpanded ? 'is-expanded' : ''} ${
          leftIcon ? 'has-icons-left' : ''
        }`}
      >
        <input
          type={props.type || 'text'}
          className={`input ${meta.touched && meta.error ? 'is-danger' : ''}`}
          {...field}
          {...props}
        />
        {leftIcon && <span className="icon is-left">{leftIcon}</span>}
        {meta.touched && meta.error ? (
          <div className="help is-danger">{meta.error}</div>
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
          className={`textarea ${meta.touched && meta.error ? 'is-danger' : ''}`}
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
        <div className="select">
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

export {
  MyInput, MyHiddenInput, MyTextArea, MySelect,
};
