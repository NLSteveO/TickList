import React from 'react';

interface InputProps {
  name: string;
  children: React.ReactNode;
}

const Label: React.FC<InputProps> = ({
  name,
  children
}) => (
  <label htmlFor={name}>
    {children}
  </label>
);

export default Label;