import React from 'react';
import renderer from 'react-test-renderer';
import EditAddress from '../src/features/Profile/Addresses/EditAddress/EditAddress';

test('EditAddress renders correctly', () => {
  const tree = renderer
    .create(<EditAddress />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
