import React from 'react';
import renderer from 'react-test-renderer';
import DetailedProduct from '../src/features/DetailedProducts/DetailedProduct';

test('DetailedProduct renders correctly', () => {
  const tree = renderer
    .create(<DetailedProduct />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
