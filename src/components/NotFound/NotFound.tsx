import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div id={classes.notfound}>
      <div className={classes.notfound}>
        <div className={classes.notfound_404}></div>
        <h1>404</h1>
        <h2>Oops! Page Not Be Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily
          unavailable
        </p>
        <Link to="/">Back to homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
