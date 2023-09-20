import React from 'react';
import renderer from 'react-test-renderer';
import Popup from '../src/components/UI/Popup/Popup';

test('Popup renders correctly', () => {
  const tree = renderer
    .create(<Popup />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
