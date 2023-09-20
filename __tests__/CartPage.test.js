import React from 'react';
import renderer from 'react-test-renderer';
import CartPage from '../src/pages/CartPage';

test('CartPage renders correctly', () => {
  const tree = renderer
    .create(<CartPage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
