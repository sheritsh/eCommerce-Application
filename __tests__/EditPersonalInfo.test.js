import React from 'react';
import renderer from 'react-test-renderer';
import EditPersonalInfo from '../src/features/Profile/PersonalInfo/EditPersonalInfo/EditPersonalInfo';

test('EditPersonalInfo renders correctly', () => {
  const tree = renderer
    .create(<EditPersonalInfo />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
