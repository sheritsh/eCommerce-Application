import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../src/components/NotFound/NotFound';

test('NotFound renders correctly', () => {
  const tree = renderer
    .create(<NotFound />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
