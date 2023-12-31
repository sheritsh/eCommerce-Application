export const enum ErrorMessages {
  NoErrors = '',
  EmptyEmail = 'Please enter email',
  EmptyPassword = 'Please enter password',
  EmptyCurrentPassword = 'Please enter current password',
  EmptyFirstName = 'Please enter first name',
  EmptyLastName = 'Please enter last name',
  EmptyDateOfBirth = 'Please enter birth day',
  EmptyCity = 'Please enter city',
  EmptyStreetName = 'Please enter street',
  EmptyPostalCode = 'Please enter post code',
  NotValidEmail = 'Email is not valid. Please provide correct email (e.g., user@example.com)',
  NotValidPassword = 'Password must contain more than 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 digit.',
  NotValidPasswordLength = 'Password must be at least 8 characters long',
  NotValidPasswordNoUppercase = 'Password must contain at least one uppercase letter (A-Z)',
  NotValidPasswordNoLowercase = 'Password must contain at least one lowercase letter (a-z)',
  NotValidPasswordNoDigit = 'Password must contain at least one digit (0-9)',
  NotValidPasswordNoSpecial = 'Password must contain at least one special character (e.g., !@#$%^&*)',
  NotValidPasswordTrailing = 'Password must not contain leading or trailing whitespace',
  NotValidFirstName = 'First name: must contain at least one character and not contain special characters or numbers',
  NotValidLastName = 'Last name: must contain at least one character and not contain special characters or numbers.',
  NotValidDateOfBirth = 'You must be over 13 years old',
  NotValidStreetName = 'Street: must contain at least 1 character, should not include special characters, and must not start or end with a space.',
  NotValidCity = 'City: must contain at least one character',
  NotValidPostalCode = 'The postal code of your country must be valid',
}
