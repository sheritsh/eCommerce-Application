import React from 'react';
import renderer from 'react-test-renderer';
import NotFoundPage from '../src/pages/NotFoundPage';
import { BrowserRouter } from 'react-router-dom'

test('NotFoundPage renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><NotFoundPage /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
