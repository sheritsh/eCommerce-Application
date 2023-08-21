import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from '../components/UI/error-message/ErrorMessage';

test('Error message renders correctly', () => {
  const tree = renderer
    .create(<ErrorMessage>Error test</ErrorMessage>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
