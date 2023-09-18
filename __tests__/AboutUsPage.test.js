import React from 'react';
import renderer from 'react-test-renderer';
import AboutUsPage from '../src/pages/AboutUsPage'

test('AboutUsPage renders correctly', () => {
  const tree = renderer
    .create(<AboutUsPage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
