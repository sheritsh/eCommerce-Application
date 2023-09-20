import React from 'react';
import renderer from 'react-test-renderer';
import CenterTabs from '../src/features/AboutUs/CenterTabs';

test('CenterTabs renders correctly', () => {
  const tree = renderer
    .create(<CenterTabs />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
