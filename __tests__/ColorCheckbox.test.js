import React from 'react';
import renderer from 'react-test-renderer';
import ColorCheckbox from '../src/components/Filters/Checkbox/ColorCheckbox/ColorCheckbox'

test('BrandCheckbox renders correctly', () => {
  const tree = renderer
    .create(<ColorCheckbox key="0" color="testColor" handleChangeCheckedColor="" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
