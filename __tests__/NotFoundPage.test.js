import React from 'react';
import renderer from 'react-test-renderer';
import NotFoundPage from '../src/pages/NotFoundPage';

test('NotFoundPage renders correctly', () => {
  const tree = renderer
    .create(<NotFoundPage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
