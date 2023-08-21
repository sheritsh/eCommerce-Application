import React from 'react';
import renderer from 'react-test-renderer';
import H1 from '../src/components/UI/titles/h1/H1';

test('H1 title renders correctly', () => {
  const tree = renderer
    .create(<H1 text="Login" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
