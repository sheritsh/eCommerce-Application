import React from 'react';
import classes from './H1.module.css';

interface H1Props {
  text?: string;
}

const H1: React.FC<H1Props> = ({ text }) => {
  return <h1 className={classes.h1}>{text}</h1>;
};

export default H1;
