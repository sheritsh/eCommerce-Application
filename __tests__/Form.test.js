import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../src/components/UI/forms/Form/Form';

test('Form renders correctly', () => {
  const tree = renderer
    .create(<Form id="loginForm"></Form>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
