import React from 'react';
import classes from './Input.module.css';

interface InputProps {
  name: string;
  type: 'text' | 'password';
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ name, type, placeholder }) => {
  return <input name={name} type={type} placeholder={placeholder} className={classes.button} />;
};

export default Input;
