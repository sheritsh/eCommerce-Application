import { ErrorMessages } from '../../components/UI/forms/form/type';

const validatePassword = (e: React.ChangeEvent): string => {
  const target = e.target as HTMLInputElement;
  const password = target.value;

  if (password.length < 8) {
    return ErrorMessages.NotValidPasswordLength;
  }
  if (!/[A-Z]/.test(password)) {
    return ErrorMessages.NotValidPasswordNoUppercase;
  }
  if (!/[a-z]/.test(password)) {
    return ErrorMessages.NotValidPasswordNoLowercase;
  }
  if (!/[0-9]/.test(password)) {
    return ErrorMessages.NotValidPasswordNoDigit;
  }
  if (password !== password.trim()) {
    return ErrorMessages.NotValidPasswordTrailing;
  }

  return 'valid';
};

export default validatePassword;
