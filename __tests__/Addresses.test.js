import React from 'react';
import renderer from 'react-test-renderer';
import Addresses from '../src/features/Profile/Addresses/Addresses';

test('Addresses renders correctly', () => {
  const tree = renderer
    .create(<Addresses />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
