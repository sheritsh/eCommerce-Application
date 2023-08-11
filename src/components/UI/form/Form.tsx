import React from 'react';
import classes from './Form.module.css';

interface FormProps {
  id?: string;
  children?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ ...props }) => {
  return (
    <form id={props.id} className={classes.form}>
      {props.children}
    </form>
  );
};

export default Form;
