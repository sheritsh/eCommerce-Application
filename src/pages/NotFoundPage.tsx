import React from 'react';
import Container from '../components/UI/container/Container';
import NotFound from '../components/NotFound/NotFound';

const NotFoundPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <NotFound />
      </Container>
    </div>
  );
};

export default NotFoundPage;
