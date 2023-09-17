import React from 'react';
import renderer from 'react-test-renderer';
import Categories from '../src/features/Categories/Categories'
import { BrowserRouter } from 'react-router-dom'

test('Categories renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><Categories /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
