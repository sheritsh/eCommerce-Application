import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../src/features/Profile/Profile';

test('Profile renders correctly', () => {
  const tree = renderer
    .create(<Profile />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
