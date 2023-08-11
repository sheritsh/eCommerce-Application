import React from 'react';
import classes from './ErrorMessage.module.css';

interface Error {
  children?: React.ReactNode;
}

const ErrorMessage: React.FC<Error> = ({ ...props }) => {
  return <div className={classes.error}>{props.children}</div>;
};

export default ErrorMessage;
