import React from 'react';
import classes from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  disabled?: boolean;
  backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, type = 'button', backgroundColor }) => {
  return (
    <button style={{ backgroundColor }} type={type} onClick={onClick} disabled={disabled} className={classes.button}>
      {text}
    </button>
  );
};

export default Button;
