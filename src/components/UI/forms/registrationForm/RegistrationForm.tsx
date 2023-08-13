import React, { useState, useEffect } from 'react';
import Container from '../../container/Container';
import Form from '../form/Form';
import H1 from '../../titles/h1/H1';
import Input from '../../input/Input';
import Button from '../../button/Button';
import H3 from '../../titles/h3/H3';
import { ErrorMessages } from '../loginForm/LoginForm';
import ErrorMessage from '../../error-message/ErrorMessage';

export const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const [emailVisited, setEmailVisited] = useState(false);
  const [passwordVisited, setPasswordVisited] = useState(false);
  const [firstNameVisited, setFirstNameVisited] = useState(false);
  const [lastNameVisited, setLastNameVisited] = useState(false);
  const [birthDayVisited, setBirthDayVisited] = useState(false);

  const [emailError, setEmailError] = useState(ErrorMessages.EmptyEmail);
  const [passwordError, setPasswordError] = useState(ErrorMessages.EmptyPassword);
  const [firstNameError, setFirstNameError] = useState(ErrorMessages.EmptyFirstName);
  const [lastNameError, setLastNameError] = useState(ErrorMessages.EmptyLastName);
  const [birthDayError, setBirthDayError] = useState(ErrorMessages.EmptyBirthDay);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || firstNameError || lastNameError || birthDayError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, firstNameError, lastNameError, birthDayError]);

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
    const criterion = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!criterion.test(String(target.value))) {
      setPasswordError(ErrorMessages.NotValidPassword);
    } else {
      setPasswordError(ErrorMessages.NoErrors);
    }
  };

  const firstNameHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setFirstName(target.value);
    const criterion = /^[a-zA-Z]{1,}$/;
    if (!criterion.test(String(target.value))) {
      setFirstNameError(ErrorMessages.NotValidFirstName);
    } else {
      setFirstNameError(ErrorMessages.NoErrors);
    }
  };

  const lastNameHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setLastName(target.value);
    const criterion = /^[a-zA-Z]{1,}$/;
    if (!criterion.test(String(target.value))) {
      setLastNameError(ErrorMessages.NotValidLastName);
    } else {
      setLastNameError(ErrorMessages.NoErrors);
    }
  };

  const birthDayHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    const today = new Date();
    const birthDate = new Date(target.value);
    const msInYear = 31536000000;
    const age = Math.trunc((+today - +birthDate) / msInYear);
    setBirthDay(target.value);
    if (age < 13) {
      setBirthDayError(ErrorMessages.NotValidBirthDay);
    } else {
      setBirthDayError(ErrorMessages.NoErrors);
    }
  };

  const blurHandler = (e: React.FocusEvent): void => {
    switch ((e.target as HTMLInputElement).name) {
      case 'email':
        setEmailVisited(true);
        break;
      case 'password':
        setPasswordVisited(true);
        break;
      case 'first-name':
        setFirstNameVisited(true);
        break;
      case 'last-name':
        setLastNameVisited(true);
        break;
      case 'birth-day':
        setBirthDayVisited(true);
        break;
      default:
        break;
    }
  };

  return (
    <Container width="30%">
      <Form>
        <H1 text="Registration" />
        {emailVisited && emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <Input
          value={email}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => emailHandler(e)}
          name="email"
          type="text"
          placeholder="Email"
        />
        {passwordVisited && passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        <Input
          value={password}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => passwordHandler(e)}
          name="password"
          type="password"
          placeholder="Password"
        />
        {firstNameVisited && firstNameError && <ErrorMessage>{firstNameError}</ErrorMessage>}
        <Input
          value={firstName}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => firstNameHandler(e)}
          name="first-name"
          type="text"
          placeholder="First name"
        />
        {lastNameVisited && lastNameError && <ErrorMessage>{lastNameError}</ErrorMessage>}
        <Input
          value={lastName}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => lastNameHandler(e)}
          name="last-name"
          type="text"
          placeholder="Last name"
        />
        <H3 text="Date of birth:" />
        {birthDayVisited && birthDayError && <ErrorMessage>{birthDayError}</ErrorMessage>}
        <Input
          value={birthDay}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => birthDayHandler(e)}
          name="birth-day"
          type="date"
        />
        <H3 text="Address:" />
        <Input name="country" type="text" placeholder="Country" />
        <Input name="city" type="text" placeholder="City" />
        <Input name="street" type="text" placeholder="Street" />
        <Input name="post-code" type="text" placeholder="Post code" />
        <Button disabled={!formValid} text="Register" />
      </Form>
    </Container>
  );
};
