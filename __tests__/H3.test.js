import React from 'react';
import renderer from 'react-test-renderer';
import H3 from '../src/components/UI/titles/H3/H3';

test('H3 title renders correctly', () => {
  const tree = renderer
    .create(<H3 text="h3 title text" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
