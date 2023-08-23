import React from 'react';
import classes from './H3.module.css';

interface H3Props {
  text?: string;
}

const H3: React.FC<H3Props> = ({ text }) => {
  return <h3 className={classes.h3}>{text}</h3>;
};

export default H3;
