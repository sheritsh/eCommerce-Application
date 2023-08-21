import React from 'react';
import renderer from 'react-test-renderer';
import RegistrationPage from '../src/pages/RegistrationPage';

test('RegistrationPage renders correctly', () => {
  const tree = renderer
    .create(<RegistrationPage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
