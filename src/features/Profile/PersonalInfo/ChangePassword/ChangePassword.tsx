// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'reactjs-popup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../components/UI/button/Button';
import Form from '../../../../components/UI/forms/form/Form';
import Input from '../../../../components/UI/input/Input';
import Popup from '../../../../components/UI/popup/Popup';
import ErrorMessage from '../../../../components/UI/ErrorMessage/ErrorMessage';
import { ErrorMessages } from '../../../../components/UI/forms/form/type';
import { useAppDispatch } from '../../../../store';
import validatePassword from '../../../../utils/validation/password-validation';
import { removeLoginError } from '../../../../store/auth/reducer';
import ENV from '../../../../api/env';
import { register } from '../../../../api/auth';
import { IPassword } from '../../types';
import { IRootState } from '../../../types';

const ChangePassword: React.FC = () => {
  const customer = useSelector((state: IRootState) => state.customer.customerData).result;
  const [open, setOpen] = useState(false);
  const closeModal = (): void => setOpen(false);
  const [formValid, setFormValid] = useState(false);
  const [isSuccessPopupActive, setSuccessPopupActive] = useState(false);
  const [isErrorPopupActive, setErrorPopupActive] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisited, setPasswordVisited] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState<'password' | 'text'>('password');
  const [passwordError, setPasswordError] = useState(ErrorMessages.EmptyPassword);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordVisited, setCurrentPasswordVisited] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(ErrorMessages.EmptyCurrentPassword);
  const dispatch = useAppDispatch();

  const togglePasswordVisibility = (): void => {
    setPasswordFieldType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handlePassword = async (data: IPassword): Promise<void> => {
    const token = await register();

    const response = await fetch(`${ENV.Host}/${ENV.ProjectKey}/customers/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSuccessPopupActive(true);
      setPopupMessage('Password changed successfully');
      setTimeout(() => closeModal(), 1500);
      setTimeout(() => setSuccessPopupActive(false), 1500);
    } else {
      setPopupMessage(`The current password does not match, enter the correct password`);
      setErrorPopupActive(true);
      console.error(response.statusText);
    }
  };

  useEffect(() => {
    if (passwordError || currentPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordError, currentPasswordError]);

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

  const currentPasswordHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    dispatch(removeLoginError());
    setCurrentPassword(target.value);

    const passwordStatus = validatePassword(e);
    if (passwordStatus !== 'valid') {
      setCurrentPasswordError(passwordStatus as React.SetStateAction<ErrorMessages>);
    } else {
      setCurrentPasswordError(ErrorMessages.NoErrors);
    }
  };

  const blurHandler = (e: React.FocusEvent): void => {
    switch ((e.target as HTMLInputElement).name) {
      case 'password':
        setPasswordVisited(true);
        break;
      case 'currentPassword':
        setCurrentPasswordVisited(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <Button text="change password" onClick={(): void => setOpen((e) => !e)} />
      <Modal open={open} closeOnDocumentClick onClose={closeModal}>
        <div>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <Form>
            <h1>Change password</h1>
            <p>Current password:</p>
            <Input
              value={currentPassword}
              name="currentPassword"
              type={passwordFieldType}
              placeholder="Current password"
              onBlur={(e): void => blurHandler(e)}
              onChange={(e): void => currentPasswordHandler(e)}
            />
            {currentPasswordVisited && currentPasswordError && <ErrorMessage>{currentPasswordError}</ErrorMessage>}
            <p>New password:</p>
            <Input
              value={password}
              onBlur={(e): void => blurHandler(e)}
              onChange={(e): void => passwordHandler(e)}
              name="password"
              type={passwordFieldType}
              placeholder="New password"
            />
            {passwordVisited && passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
            <button className="password_hide" type="button" onClick={togglePasswordVisibility}>
              {passwordFieldType === 'password' ? 'Show' : 'Hide'} Password
            </button>
            <Button
              disabled={!formValid}
              text="Change"
              onClick={(): Promise<void> =>
                handlePassword({
                  id: customer.id,
                  version: customer.version,
                  currentPassword,
                  newPassword: password,
                })
              }
            />
          </Form>
          <Popup
            active={isSuccessPopupActive}
            setActive={setSuccessPopupActive}
            popupType="success"
            message={popupMessage}
          />
          <Popup active={isErrorPopupActive} setActive={setErrorPopupActive} popupType="error" message={popupMessage} />
        </div>
      </Modal>
    </div>
  );
};

export default ChangePassword;
