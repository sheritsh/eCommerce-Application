import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../src/components/UI/forms/LoginForm/LoginForm';
jest.mock('react-redux');

test('LoginForm renders correctly', () => {
  const tree = renderer
    .create(<LoginForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
