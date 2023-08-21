import React from 'react';
import renderer from 'react-test-renderer';
import Container from '../components/UI/container/Container.tsx';

test('Empty container renders correctly', () => {
  const tree = renderer
    .create(<Container />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
