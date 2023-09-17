import React from 'react';
import renderer from 'react-test-renderer';
import ChangePassword from '../src/features/Profile/PersonalInfo/ChangePassword/ChangePassword';

test('ChangePassword renders correctly', () => {
  const tree = renderer
    .create(<ChangePassword />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
