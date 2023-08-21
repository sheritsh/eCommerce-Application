import React from 'react';
import renderer from 'react-test-renderer';
import LoginPage from '../src/pages/LoginPage';

test('LoginPage renders correctly', () => {
  const tree = renderer
    .create(<LoginPage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
