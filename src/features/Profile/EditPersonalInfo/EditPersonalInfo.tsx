import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Popup from 'reactjs-popup';
import './EditPersonalInfo.scss';
import { useSelector } from 'react-redux';
import Input from '../../../components/UI/input/Input';
import Form from '../../../components/UI/forms/form/Form';
import Button from '../../../components/UI/button/Button';
import { ErrorMessages } from '../../../components/UI/forms/form/type';
import ErrorMessage from '../../../components/UI/ErrorMessage/ErrorMessage';
import { changePersonalInfo } from '../customer-slice';
import { IRootState } from '../../../store';

const EditPersonalInfo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const closeModal = (): void => setOpen(false);
  const token = useSelector((state: IRootState) => state.auth.authData.accessToken);
  const customer = useSelector((state: IRootState) => state.customer.customerData).result;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameVisited, setFirstNameVisited] = useState(false);
  const [lastNameVisited, setLastNameVisited] = useState(false);
  const [dateOfBirthVisited, setDateOfBirthVisited] = useState(false);
  const [emailVisited, setEmailVisited] = useState(false);
  const [firstNameError, setFirstNameError] = useState(ErrorMessages.EmptyFirstName);
  const [lastNameError, setLastNameError] = useState(ErrorMessages.EmptyLastName);
  const [dateOfBirthError, setDateOfBirthError] = useState(ErrorMessages.EmptyDateOfBirth);
  const [emailError, setEmailError] = useState(ErrorMessages.EmptyEmail);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (firstNameError || lastNameError || dateOfBirthError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [firstNameError, lastNameError, dateOfBirthError, emailError]);

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

  const blurHandler = (e: React.FocusEvent): void => {
    switch ((e.target as HTMLInputElement).name) {
      case 'firstName':
        setFirstNameVisited(true);
        break;
      case 'lastName':
        setLastNameVisited(true);
        break;
      case 'dateOfBirth':
        setDateOfBirthVisited(true);
        break;
      case 'email':
        setEmailVisited(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Button text="Edit" onClick={(): void => setOpen((e) => !e)} />
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <Form>
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
            <Input
              value={email}
              onBlur={(e): void => blurHandler(e)}
              onChange={(e): void => emailHandler(e)}
              name="email"
              type="text"
              placeholder="Email"
            />
            {emailVisited && emailError && <ErrorMessage>{emailError}</ErrorMessage>}
            <h3>Date of birth:</h3>
            <Input
              value={dateOfBirth}
              onBlur={(e): void => blurHandler(e)}
              onChange={(e): void => dateOfBirthHandler(e)}
              name="dateOfBirth"
              type="date"
            />
            {dateOfBirthVisited && dateOfBirthError && <ErrorMessage>{dateOfBirthError}</ErrorMessage>}
            <Button
              disabled={!formValid}
              onClick={(): void => {
                changePersonalInfo(token, customer.id, customer.version, {
                  firstName,
                  lastName,
                  dateOfBirth,
                  email,
                });
              }}
              text="update"
            />
          </Form>
        </div>
      </Popup>
    </div>
  );
};

export default EditPersonalInfo;
