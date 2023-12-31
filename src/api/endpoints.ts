import ENV from './env';
import { Settings, Languages } from './types';

const Endpoints = {
  AUTH: 'https://auth.us-central1.gcp.commercetools.com',
  GET_DETAILED_PRODUCT: `${ENV.Host}/${ENV.ProjectKey}/products`,
  GET_PRODUCTS: `${ENV.Host}/${ENV.ProjectKey}/product-projections`,
  GET_PRODUCTS_BY_CATEGORY: `${ENV.Host}/${ENV.ProjectKey}/product-projections/search?staged=true&filter=categories.id:`,
  GET_PRODUCTS_BY_PARAMS: `${ENV.Host}/${ENV.ProjectKey}/product-projections/search?staged=true`,
  GET_SEARCH: `${ENV.Host}/${ENV.ProjectKey}/product-projections/search?staged=true&limit=${Settings.ProductsPerPage}&text.${Languages.English}=`,
  GET_SORT: `${ENV.Host}/${ENV.ProjectKey}/product-projections/`,
  GET_CATEGORIES: `${ENV.Host}/${ENV.ProjectKey}/categories`,
  GET_CARTS: `${ENV.Host}/${ENV.ProjectKey}/me/carts/`,
  GET_ANON_CARTS: `${ENV.Host}/${ENV.ProjectKey}/me/carts/`,
};

export default Endpoints;
