import React from 'react';
import RegistrationForm from '../components/UI/forms/registrationForm/RegistrationForm';
import Container from '../components/UI/container/Container';

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
