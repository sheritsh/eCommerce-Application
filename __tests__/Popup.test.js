import React from 'react';
import renderer from 'react-test-renderer';
import Popup from '../src/components/UI/popup/Popup';

test('Popup renders correctly', () => {
  const tree = renderer
    .create(<Popup active="true" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
