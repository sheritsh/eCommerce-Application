import SdkAuth from '@commercetools/sdk-auth';
import ENV from './env';
import Endpoints from './endpoints';
import { ISdkAuthOptions } from './types';

const createClient: ISdkAuthOptions = new SdkAuth({
  host: Endpoints.AUTH,
  projectKey: ENV.ProjectKey,
  credentials: {
    clientId: ENV.Client_id,
    clientSecret: ENV.Client_secret,
  },
  fetch,
});

export default createClient;
