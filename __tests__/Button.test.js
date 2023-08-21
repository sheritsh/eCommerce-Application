import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../src/components/UI/Button/Button'

test('Button renders correctly', () => {
  const tree = renderer
    .create(<Button type="button" disabled="true" text="Login" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
