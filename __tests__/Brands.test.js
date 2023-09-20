import React from 'react';
import renderer from 'react-test-renderer';
import Brands from '../src/components/Brands/Brands';
import { BrowserRouter } from 'react-router-dom'

test('Brands renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><Brands /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
