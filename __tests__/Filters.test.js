import React from 'react';
import renderer from 'react-test-renderer';
import Filters from '../src/components/Filters/Filters'

test('Filters renders correctly', () => {
  const tree = renderer
    .create(<Filters
      brands={['A', 'B']}
      handleChangeCheckedBrand=""
      colors={['A', 'B']}
      handleChangeCheckedColor=""
      sizes={['A', 'B']}
      handleChangeCheckedSize=""
      prices={['A', 'B']}
      selectedPrice="50"
      changePrice=""
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});