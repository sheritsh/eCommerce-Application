import React from 'react';
import classes from './Footer.module.css';
import Container from '../UI/container/Container';

const Footer: React.FC = () => {
  const footerContext = '<footer></footer>';
  return (
    <footer>
      <Container>
        <div className={classes.footer}>{footerContext}</div>
      </Container>
    </footer>
  );
};

export default Footer;
