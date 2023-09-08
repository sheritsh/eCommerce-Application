import ENV from './env';
import { Settings, Languages } from './types';

const Endpoints = {
  AUTH: 'https://auth.us-central1.gcp.commercetools.com',
  GET_DETAILED_PRODUCT: `${ENV.Host}/${ENV.ProjectKey}/products`,
  GET_PRODUCTS: `${ENV.Host}/${ENV.ProjectKey}/product-projections`,
  GET_PRODUCTS_BY_CATEGORY: `${ENV.Host}/${ENV.ProjectKey}/product-projections/search?staged=true&filter=categories.id:`,
  GET_PRODUCTS_BY_PARAMS: `${ENV.Host}/${ENV.ProjectKey}/product-projections/search?staged=true&limit=10`,
  GET_SEARCH: `${ENV.Host}/${ENV.ProjectKey}/product-projections/search?staged=true&limit=${Settings.ProductsPerPage}&text.${Languages.English}=`,
  GET_SORT: `${ENV.Host}/${ENV.ProjectKey}/product-projections/`,
  GET_CATEGORIES: `${ENV.Host}/${ENV.ProjectKey}/categories`,
  // GET_PRODUCTS_BY_CATEGORY_FILTER: `${ENV.Host}/${ENV.ProjectKey}/product-projections/search?`,
};
//
export default Endpoints;
