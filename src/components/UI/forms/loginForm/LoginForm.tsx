import React, { useState, useEffect, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeLoginError } from '../../../../store/auth/reducer';
import Form from '../form/Form';
import H1 from '../../titles/h1/H1';
import Input from '../../input/Input';
import Container from '../../container/Container';
import Button from '../../button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { useAppDispatch } from '../../../../store';
import { loginUser } from '../../../../store/auth/actions';
import { ErrorMessages, IRootState } from '../form/type';
import validatePassword from '../../../../utils/validation/password-validation';

const LoginForm: React.FC = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVisited, setEmailVisited] = useState(false);
  const [passwordVisited, setPasswordVisited] = useState(false);
  const [emailError, setEmailError] = useState(ErrorMessages.EmptyEmail);
  const [passwordError, setPasswordError] = useState(ErrorMessages.EmptyPassword);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const errorLogin = useSelector((state: IRootState) => state.auth.authData.error);

  useEffect(() => {
    if (!emailError && !passwordError) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    dispatch(removeLoginError());
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
    dispatch(removeLoginError());
    setPassword(target.value);

    const passwordStatus = validatePassword(e);
    if (passwordStatus !== 'valid') {
      setPasswordError(passwordStatus as React.SetStateAction<ErrorMessages>);
    } else {
      setPasswordError(ErrorMessages.NoErrors);
    }
  };

  const sendData = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password }));
      navigate('/dist');
    } catch (error) {
      console.error(error);
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
    <Container>
      <Form id="loginForm">
        <H1 text="Login" />
        {errorLogin && <ErrorMessage>{errorLogin}</ErrorMessage>}
        {emailVisited && emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <Input
          value={username}
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
        <Button
          type="button"
          onClick={(e: FormEvent): Promise<void> => sendData(e)}
          disabled={buttonDisabled}
          text="Login"
        />
      </Form>
    </Container>
  );
};

export default LoginForm;
