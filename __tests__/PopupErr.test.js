import React from 'react';
import renderer from 'react-test-renderer';
import PopupErr from '../src/components/UI/Popup/PopupErr';

test('PriceSlider renders correctly', () => {
  const tree = renderer
    .create(<PopupErr />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});