import ENV from './env';

const Endpoints = {
  AUTH: 'https://auth.us-central1.gcp.commercetools.com',
  GET_PRODUCTS: `${ENV.Host}/${ENV.ProjectKey}/products`,
  GET_CATEGORIES: `${ENV.Host}/${ENV.ProjectKey}/categories`,
};

export default Endpoints;
