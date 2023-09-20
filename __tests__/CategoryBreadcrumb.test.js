import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import CategoryBreadcrumb from '../src/components/Breadcrumbs/CategoryBreadcrumb';

test('Breadcrumbs render correctly', () => {
  const tree = renderer
    .create(<MemoryRouter><CategoryBreadcrumb /></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
