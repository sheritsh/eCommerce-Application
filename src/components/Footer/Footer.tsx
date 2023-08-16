import React from 'react';
import './Footer.module.css';
import Container from '../UI/container/Container';

const Footer: React.FC = () => {
  const footerContext = '<footer></footer>';
  return (
    <footer>
      <Container>{footerContext}</Container>
    </footer>
  );
};

export default Footer;
