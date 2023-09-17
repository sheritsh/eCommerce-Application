import React from 'react';
import renderer from 'react-test-renderer';
import ProductsByParams from '../src/features/filters/ProductsByParams/ProductsByParams'
import { BrowserRouter } from 'react-router-dom';

test('ProductsByParams renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><ProductsByParams /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
