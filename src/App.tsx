import React from 'react';
import LoginForm from './components/UI/forms/loginForm/LoginForm';
import { RegistrationForm } from './components/UI/forms/registrationForm/RegistrationForm';

const App: React.FC = () => {
  return (
    <>
      <LoginForm></LoginForm>
      <RegistrationForm></RegistrationForm>
    </>
  );
};

export default App;
