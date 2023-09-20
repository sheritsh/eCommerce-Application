import React from 'react';
import renderer from 'react-test-renderer';
import AddAddress from '../src/features/Profile/Addresses/newAddress/AddAddress';

test('AddAddress renders correctly', () => {
  const tree = renderer
    .create(<AddAddress />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
