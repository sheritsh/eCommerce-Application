import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../container/Container';
import { removeLoginError } from '../../../../features/Authorization/authorization-slice';
import Form from '../form/Form';
import Input from '../../input/Input';
import Button from '../../button/Button';
import { useAppDispatch } from '../../../../store';
import { ErrorMessages } from '../form/type';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import validatePassword from '../../../../utils/validation/password-validation';
import { IRegisterRequest } from '../../../../api/types';
import ENV from '../../../../api/env';
import { register } from '../../../../api/auth';
import Popup from '../../popup/Popup';
import classes from '../form/Form.module.scss';

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('US');
  const [city, setCity] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isSuccessPopupActive, setSuccessPopupActive] = useState(false);
  const [isErrorPopupActive, setErrorPopupActive] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [emailVisited, setEmailVisited] = useState(false);
  const [passwordVisited, setPasswordVisited] = useState(false);
  const [firstNameVisited, setFirstNameVisited] = useState(false);
  const [lastNameVisited, setLastNameVisited] = useState(false);
  const [dateOfBirthVisited, setDateOfBirthVisited] = useState(false);
  const [cityVisited, setCityVisited] = useState(false);
  const [streetNameVisited, setStreetNameVisited] = useState(false);
  const [postalCodeVisited, setPostalCodeVisited] = useState(false);
  const [emailError, setEmailError] = useState(ErrorMessages.EmptyEmail);
  const [passwordError, setPasswordError] = useState(ErrorMessages.EmptyPassword);
  const [firstNameError, setFirstNameError] = useState(ErrorMessages.EmptyFirstName);
  const [lastNameError, setLastNameError] = useState(ErrorMessages.EmptyLastName);
  const [dateOfBirthError, setDateOfBirthError] = useState(ErrorMessages.EmptyDateOfBirth);
  const [cityError, setCityError] = useState(ErrorMessages.EmptyCity);
  const [streetNameError, setStreetNameError] = useState(ErrorMessages.EmptyStreetName);
  const [postalCodeError, setPostalCodeError] = useState(ErrorMessages.EmptyPostalCode);
  const [formValid, setFormValid] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState<'password' | 'text'>('password');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = (): void => {
    setPasswordFieldType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleRegister = async (data: IRegisterRequest): Promise<void> => {
    const token = await register();

    const response = await fetch(`${ENV.Host}/${ENV.ProjectKey}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSuccessPopupActive(true);
      setPopupMessage('Congratulations! Registration successful.');
      setTimeout(() => navigate('/'), 5000);
    } else {
      const errorData = await response.json();
      setPopupMessage(`Oops! Error ${response.status}: ${errorData.message}`);
      setErrorPopupActive(true);
      // console.error(response.statusText);
    }
  };

  useEffect(() => {
    if (
      emailError ||
      passwordError ||
      firstNameError ||
      lastNameError ||
      dateOfBirthError ||
      cityError ||
      streetNameError ||
      postalCodeError
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    emailError,
    passwordError,
    firstNameError,
    lastNameError,
    dateOfBirthError,
    cityError,
    streetNameError,
    postalCodeError,
  ]);

  const emailHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(String(target.value))) {
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

  const firstNameHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setFirstName(target.value);
    const criterion = /^[a-zA-Z]+$/;
    if (!criterion.test(String(target.value))) {
      setFirstNameError(ErrorMessages.NotValidFirstName);
    } else {
      setFirstNameError(ErrorMessages.NoErrors);
    }
  };

  const lastNameHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setLastName(target.value);
    const criterion = /^[a-zA-Z]+$/;
    if (!criterion.test(String(target.value))) {
      setLastNameError(ErrorMessages.NotValidLastName);
    } else {
      setLastNameError(ErrorMessages.NoErrors);
    }
  };

  const dateOfBirthHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    const birthDate = new Date(target.value);

    const today = new Date();
    const thirteenYearsAgo = new Date(today);
    thirteenYearsAgo.setFullYear(today.getFullYear() - 13);

    setDateOfBirth(target.value);

    if (birthDate >= thirteenYearsAgo) {
      setDateOfBirthError(ErrorMessages.NotValidDateOfBirth);
    } else {
      setDateOfBirthError(ErrorMessages.NoErrors);
    }
  };

  const countryHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setCountry(target.value);
  };

  const cityHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setCity(target.value);
    const criterion = /^[a-zA-Z]+$/;
    if (!criterion.test(String(target.value))) {
      setCityError(ErrorMessages.NotValidCity);
    } else {
      setCityError(ErrorMessages.NoErrors);
    }
  };

  const streetNameHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setStreetName(target.value);
    const criterion = /^.+$/;
    if (!criterion.test(String(target.value))) {
      setStreetNameError(ErrorMessages.NotValidStreetName);
    } else {
      setStreetNameError(ErrorMessages.NoErrors);
    }
  };

  const postalCodeHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setPostalCode(target.value);

    let criterion = /^/;
    if (country === 'US') {
      criterion = /^[0-9]{5}(?:-[0-9]{4})?$/;
    } else if (country === 'DE') {
      criterion = /^\d{5}$/;
    }

    if (!criterion.test(String(target.value))) {
      setPostalCodeError(ErrorMessages.NotValidPostalCode);
    } else {
      setPostalCodeError(ErrorMessages.NoErrors);
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
      case 'firstName':
        setFirstNameVisited(true);
        break;
      case 'lastName':
        setLastNameVisited(true);
        break;
      case 'dateOfBirth':
        setDateOfBirthVisited(true);
        break;
      case 'city':
        setCityVisited(true);
        break;
      case 'streetName':
        setStreetNameVisited(true);
        break;
      case 'postalCode':
        setPostalCodeVisited(true);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Form id="registrationForm">
        <h1>Registration</h1>
        <Input
          value={email}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => emailHandler(e)}
          name="email"
          type="text"
          placeholder="Email"
        />
        {emailVisited && emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <div className={classes.password}>
          <Input
            value={password}
            onBlur={(e): void => blurHandler(e)}
            onChange={(e): void => passwordHandler(e)}
            name="password"
            type={passwordFieldType}
            placeholder="Password"
          />
          <a
            onClick={togglePasswordVisibility}
            className={passwordFieldType === 'password' ? classes.noEye : classes.eye}
          ></a>
        </div>
        {passwordVisited && passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        <Input
          value={firstName}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => firstNameHandler(e)}
          name="firstName"
          type="text"
          placeholder="First name"
        />
        {firstNameVisited && firstNameError && <ErrorMessage>{firstNameError}</ErrorMessage>}
        <Input
          value={lastName}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => lastNameHandler(e)}
          name="lastName"
          type="text"
          placeholder="Last name"
        />
        {lastNameVisited && lastNameError && <ErrorMessage>{lastNameError}</ErrorMessage>}
        <h3>Date of birth:</h3>
        <Input
          value={dateOfBirth}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => dateOfBirthHandler(e)}
          name="dateOfBirth"
          type="date"
        />
        {dateOfBirthVisited && dateOfBirthError && <ErrorMessage>{dateOfBirthError}</ErrorMessage>}
        <h3>Address:</h3>
        <select onChange={(e): void => countryHandler(e)} name="country" defaultValue="US">
          <option value="US">United States</option>
          <option value="DE">Germany</option>
        </select>
        <Input
          value={city}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => cityHandler(e)}
          name="city"
          type="text"
          placeholder="City"
        />
        {cityVisited && cityError && <ErrorMessage>{cityError}</ErrorMessage>}
        <Input
          value={streetName}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => streetNameHandler(e)}
          name="streetName"
          type="text"
          placeholder="Street"
        />
        {streetNameVisited && streetNameError && <ErrorMessage>{streetNameError}</ErrorMessage>}
        <Input
          value={postalCode}
          onBlur={(e): void => blurHandler(e)}
          onChange={(e): void => postalCodeHandler(e)}
          name="postalCode"
          type="text"
          placeholder="Post code"
        />
        {postalCodeVisited && postalCodeError && <ErrorMessage>{postalCodeError}</ErrorMessage>}
        <Button
          onClick={(): Promise<void> =>
            handleRegister({
              email,
              password,
              firstName,
              lastName,
              dateOfBirth,
              addresses: [
                {
                  country,
                  city,
                  streetName,
                  postalCode,
                },
              ],
            })
          }
          disabled={!formValid}
          text="Register"
        />
        <div>
          Already have an account? <Link to="/login">Log in</Link>!
        </div>
      </Form>
      <Popup
        active={isSuccessPopupActive}
        setActive={setSuccessPopupActive}
        popupType="success"
        message={popupMessage}
      />
      <Popup active={isErrorPopupActive} setActive={setErrorPopupActive} popupType="error" message={popupMessage} />
    </Container>
  );
};

export default RegistrationForm;
