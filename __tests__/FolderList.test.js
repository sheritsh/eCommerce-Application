import React from 'react';
import renderer from 'react-test-renderer';
import FolderList from '../src/features/AboutUs/FolderList';

test('FolderList renders correctly', () => {
  const tree = renderer
    .create(<FolderList />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
