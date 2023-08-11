import React, { useState, useEffect } from 'react';
import Form from '../form/Form';
import H1 from '../../titles/h1/H1';
import Input from '../../input/Input';
import Container from '../../container/Container';
import Button from '../../button/Button';
import ErrorMessage from '../../error-message/ErrorMessage';

enum ErrorMessages {
  NoErrors = '',
  EmptyEmail = 'Please enter email',
  EmptyPassword = 'Please enter password',
  NotValidEmail = 'Email is not valid',
  NotValidPassword = 'Password must contain 5-10 characters.',
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVisited, setEmailVisited] = useState(false);
  const [passwordVisited, setPasswordVisited] = useState(false);
  const [emailError, setEmailError] = useState(ErrorMessages.EmptyEmail);
  const [passwordError, setPasswordError] = useState(ErrorMessages.EmptyPassword);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (!emailError && !passwordError) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(target.value).toLowerCase())) {
      setEmailError(ErrorMessages.NotValidEmail);
    } else {
      setEmailError(ErrorMessages.NoErrors);
    }
  };

  const passwordHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
    if (target.value.length < 5 || target.value.length > 10) {
      setPasswordError(ErrorMessages.NotValidPassword);
    } else {
      setPasswordError(ErrorMessages.NoErrors);
    }
  };

  const blurHandler = (e: React.FocusEvent): void => {
    const target = e.target as HTMLInputElement;
    const { name } = target;
    switch (name) {
      case 'email':
        setEmailVisited(true);
        break;
      case 'password':
        setPasswordVisited(true);
        break;
      default:
        break;
    }
  };

  return (
    <Container width="30%">
      <Form id="registrationForm">
        <H1 text="Login page" />
        {emailVisited && emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <Input
          value={email}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => emailHandler(e)}
          name="email"
          type="text"
          placeholder="Enter your email"
        />
        {passwordVisited && passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        <Input
          value={password}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => passwordHandler(e)}
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <Button disabled={buttonDisabled} text="Login" />
      </Form>
    </Container>
  );
};

export default LoginForm;
