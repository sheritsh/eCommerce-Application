import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../src/components/Footer/Footer';

test('Footer renders correctly', () => {
  const tree = renderer
    .create(<Footer />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
