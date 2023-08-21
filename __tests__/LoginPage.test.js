import React from 'react';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';

test('LoginPage renders correctly', () => {
  const tree = renderer
  .create(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});