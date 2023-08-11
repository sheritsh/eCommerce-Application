import React from 'react';
import classes from './Input.module.css';

interface InputProps {
  value?: string;
  name: string;
  type: 'text' | 'password';
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ onBlur, onChange, name, type, placeholder }) => {
  return (
    <input
      onBlur={onBlur}
      onChange={onChange}
      name={name}
      type={type}
      placeholder={placeholder}
      className={classes.input}
    />
  );
};

export default Input;
