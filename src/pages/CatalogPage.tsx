import React from 'react';
import Container from '../components/UI/container/Container';
import H1 from '../components/UI/titles/h1/H1';
import Products from '../features/Products/Products';
import Categories from '../features/Categories/Categories';

const Catalog: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <H1 text="Catalog" />
          <Categories />
          <Products />
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
