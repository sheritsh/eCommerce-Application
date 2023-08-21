import React from 'react';
import RegistrationForm from '../components/UI/forms/RegistrationForm/RegistrationForm';
import Container from '../components/UI/Container/Container';

const RegistrationPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <RegistrationForm />
      </Container>
    </div>
  );
};

export default RegistrationPage;
