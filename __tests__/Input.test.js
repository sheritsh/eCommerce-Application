import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../src/components/UI/input/Input';

test('Input renders correctly', () => {
  const tree = renderer
    .create(<Input
      value="test-value"
      name="email"
      type="text"
      placeholder="Enter your email"
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
