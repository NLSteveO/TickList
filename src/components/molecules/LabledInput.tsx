import React from 'react';
import { Input, Label } from '../atoms';


interface LabledInputProps {
  label: string;
  name: string;
  error?: string;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
}

const LabledInput: React.FC<LabledInputProps> = ({
  label,
  name,
  error,
  placeholder,
  type = 'text',
  onChange,
  onBlur,
  ref
}) => {
  const input = <Input
    name={name}
    type={type}
    placeholder={placeholder}
    error={error}
    onChange={onChange}
    onBlur={onBlur}
    ref={ref}
  />;
  return (
    <div>
      <Label name={name}>
        {label}: {input}
      </Label>
      {error && <p id={`${name}-error`}>{error}</p>}
    </div>
  );
};

export default LabledInput;
