import React from 'react';
import renderer from 'react-test-renderer';
import AboutUs from '../src/features/AboutUs/AboutUs'

test('AboutUs renders correctly', () => {
  const tree = renderer
    .create(<AboutUs />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
