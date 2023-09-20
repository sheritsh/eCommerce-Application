import React from 'react';
import renderer from 'react-test-renderer';
import ProfilePage from '../src/pages/ProfilePage';

test('ProfilePage renders correctly', () => {
  const tree = renderer
    .create(<ProfilePage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
