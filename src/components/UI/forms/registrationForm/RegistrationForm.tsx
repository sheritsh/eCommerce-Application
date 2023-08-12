import React from 'react';
import Container from '../../container/Container';
import Form from '../form/Form';
import H1 from '../../titles/h1/H1';
import Input from '../../input/Input';
import Button from '../../button/Button';
import H3 from '../../titles/h3/H3';

export const RegistrationForm: React.FC = () => {
  return (
    <Container>
      <Form>
        <H1 text="Registration" />
        <Input name="email" type="text" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Input name="first-name" type="text" placeholder="First name" />
        <Input name="last-name" type="text" placeholder="Last name" />
        <Input name="birth-date" type="date" placeholder="Date of birth" />
        <H3 text="address:" />
        <Input name="country" type="text" placeholder="Country" />
        <Input name="city" type="text" placeholder="City" />
        <Input name="street" type="text" placeholder="Street" />
        <Input name="post-code" type="text" placeholder="Post code" />
        <Button text="Register" />
      </Form>
    </Container>
  );
};
