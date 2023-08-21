import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../components/UI/forms/loginForm/LoginForm';
jest.mock('react-redux');

test('LoginForm renders correctly', () => {
  const tree = renderer
    .create(<LoginForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
