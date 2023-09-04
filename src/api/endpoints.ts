import ENV from './env';

const Endpoints = {
  AUTH: 'https://auth.us-central1.gcp.commercetools.com',
  GET_PRODUCTS: `${ENV.Host}/${ENV.ProjectKey}/products`,
  GET_SEARCH: `${ENV.Host}/${ENV.ProjectKey}/product-projections`,
  GET_CATEGORIES: `${ENV.Host}/${ENV.ProjectKey}/categories`,
  GET_PRODUCTS_BY_CATEGORY: `${ENV.Host}/${ENV.ProjectKey}/product-projections/search?staged=true&limit=10&filter=categories.id:`,
};

export default Endpoints;
