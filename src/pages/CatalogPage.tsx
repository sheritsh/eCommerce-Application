import React from 'react';
import Container from '../components/UI/container/Container';
import H1 from '../components/UI/titles/h1/H1';
import Product from '../api/product/Product';
import Button from '../components/UI/button/Button';

const Catalog: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <H1 text="Catalog" />
          <Product />
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
