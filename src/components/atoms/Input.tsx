import React from 'react';

interface InputProps {
  name: string;
  error?: string;
  placeholder?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  name,
  error,
  placeholder,
  type = 'text',
  onChange,
  onBlur,
  ref
}) => (
  <input
    id={name}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={onBlur}
    ref={ref}
    aria-invalid={!!error}
    aria-describedby={`${name}-error`}
  />
);

export default Input;
