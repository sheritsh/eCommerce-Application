import React from 'react';
import renderer from 'react-test-renderer';
import SortForm from '../src/features/filters/Sorting/SortForm'

test('SortForm renders correctly', () => {
  const tree = renderer
    .create(<SortForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
