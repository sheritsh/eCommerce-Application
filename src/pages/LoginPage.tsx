import React from 'react';
import LoginForm from '../components/UI/forms/loginForm/LoginForm';
import Container from '../components/UI/container/Container';

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
