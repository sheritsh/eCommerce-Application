import React from 'react';
import classes from './Button.module.css';

interface ButtonProps {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={classes.button}>
      {text}
    </button>
  );
};

export default Button;
