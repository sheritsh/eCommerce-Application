import React from 'react';
import LoginForm from '../components/UI/forms/LoginForm/LoginForm';
import Container from '../components/UI/Container/Container';

const LoginPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
};

export default LoginPage;
