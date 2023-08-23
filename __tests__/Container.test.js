import React from 'react';
import renderer from 'react-test-renderer';
import Container from '../src/components/UI/Container/Container';

test('Empty container renders correctly', () => {
  const tree = renderer
    .create(<Container />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
