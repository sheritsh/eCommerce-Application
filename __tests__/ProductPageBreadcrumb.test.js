import React from 'react';
import renderer from 'react-test-renderer';
import ProductPageBreadcrumb from '../src/components/Breadcrumbs/ProductPageBreadcrumb';
import { BrowserRouter } from 'react-router-dom';

test('NotFoundPage renders correctly', () => {
  const tree = renderer
    .create(<BrowserRouter><ProductPageBreadcrumb /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
