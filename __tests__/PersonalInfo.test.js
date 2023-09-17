import React from 'react';
import renderer from 'react-test-renderer';
import PersonalInfo from '../src/features/Profile/PersonalInfo/PersonalInfo';

test('PersonalInfo renders correctly', () => {
  const tree = renderer
    .create(<PersonalInfo />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
