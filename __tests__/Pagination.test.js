import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../src/features/Pagination/Pagination'

test('Pagination renders correctly', () => {
  const tree = renderer
    .create(<Pagination />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
