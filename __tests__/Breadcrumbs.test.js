import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../src/components/Breadcrumbs/Breadcrumbs';

test('Breadcrumbs render correctly', () => {
  const tree = renderer
    .create(<MemoryRouter><Breadcrumbs /></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
