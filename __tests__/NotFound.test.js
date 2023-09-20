import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../src/components/NotFound/NotFound';
import { BrowserRouter } from 'react-router-dom'

test('NotFound renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><NotFound /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
