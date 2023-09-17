import React from 'react';
import renderer from 'react-test-renderer';
import MainCategories from '../src/components/MainCategories/MainCategories';
import { BrowserRouter } from 'react-router-dom';

test('MainCategories renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><MainCategories /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
