import React from 'react';
import Container from '../components/UI/container/Container';
import Products from '../features/Products/Products';
import Categories from '../features/Categories/Categories';

const Catalog: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <h1>Catalog</h1>
          <Categories />
          <Products />
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
