import React from 'react';
import renderer from 'react-test-renderer';
import PriceSlider from '../src/components/Filters/PriceSlider/PriceSlider';

test('PriceSlider renders correctly', () => {
  const tree = renderer
    .create(<PriceSlider price={{
      min: 0,
      max: 100,
    }}
    value="10"
    changePrice="" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});