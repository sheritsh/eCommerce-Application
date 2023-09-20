import React from 'react';
import classes from './Container.module.css';

interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ ...props }) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default Container;
