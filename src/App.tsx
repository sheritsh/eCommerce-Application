import React from 'react';
import Button from './components/UI/button/Button';
import Input from './components/UI/input/Input';
import H1 from './components/UI/titles/h1/H1';
import Container from './components/UI/container/Container';
import Form from './components/UI/form/Form';

const App: React.FC = () => {
  return (
    <Container width="30%">
      <Form id="registrationForm">
        <H1 text="Registration" />
        <Input name="email" type="text" placeholder="Enter your email" />
        <Input name="password" type="password" placeholder="Enter your password" />
        <Button text="Register" />
      </Form>
    </Container>
  );
};

export default App;
