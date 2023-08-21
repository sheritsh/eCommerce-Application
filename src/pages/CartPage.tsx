import React from 'react';
import Container from '../components/UI/Container/Container';
import H1 from '../components/UI/titles/H1/H1';

const CartPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="main">
          <H1 text="Your Cart" />
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
