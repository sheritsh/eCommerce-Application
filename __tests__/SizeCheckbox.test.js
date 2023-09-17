import React from 'react';
import renderer from 'react-test-renderer';
import SizeCheckbox from '../src/components/Filters/Checkbox/SizeCheckbox/SizeCheckbox';

test('SizeCheckbox renders correctly', () => {
  const tree = renderer
    .create(<SizeCheckbox />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
