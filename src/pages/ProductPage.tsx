import React from 'react';
import Container from '../components/UI/container/Container';
import DetailedProduct from '../features/DetailedProducts/DetailedProduct';

const ProductPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <DetailedProduct />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
