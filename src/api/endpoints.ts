import ENV from './env';

const Endpoints = {
  AUTH: 'https://auth.us-central1.gcp.commercetools.com',
  GET_PRODUCTS: `${ENV.Host}/${ENV.ProjectKey}/products`,
};

export default Endpoints;
