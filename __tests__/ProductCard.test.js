import React from 'react';
import renderer from 'react-test-renderer';
import ProductCard from '../src/features/Products/ProductCard/ProductCard';

test('ProductCard renders correctly', () => {
  const tree = renderer
    .create(<ProductCard />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
