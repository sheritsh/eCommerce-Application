import React from 'react';
import renderer from 'react-test-renderer';
import BrandCheckbox from '../src/components/Filters/Checkbox/BrandCheckbox/BrandCheckbox'

test('BrandCheckbox renders correctly', () => {
  const tree = renderer
    .create(<BrandCheckbox key="0" brand="testBrand" handleChangeCheckedBrand="" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
