import React from 'react';
import Container from '../components/UI/container/Container';
import Cart from '../features/Cart/Cart';

const CartPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="main">
          <Cart />
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
