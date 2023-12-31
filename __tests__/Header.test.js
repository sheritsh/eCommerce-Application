import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../src/components/Header/Header';

test('Header renders correctly', () => {
  const tree = renderer
    .create(<Header />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
