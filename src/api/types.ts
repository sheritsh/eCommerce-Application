import { FetchError } from 'node-fetch';

export enum Languages {
  English = 'en-US',
}

export enum Settings {
  ProductsPerPage = 6,
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface IRegisterResponce {
  access_token: string;
}

export interface ICredentials {
  clientId: string;
  clientSecret: string;
}

export interface ISdkAuthOptions {
  host: string;
  projectKey: string;
  credentials: ICredentials;
  fetch?: unknown;
  customerPasswordFlow: ({ username, password }: ILoginRequest) => Promise<ILoginResponse>;
  clientCredentialsFlow: () => Promise<IRegisterResponce>;
  anonymousFlow: () => Promise<IRegisterResponce>;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: [{ country: string; city: string; streetName: string; postalCode: string }];
}

export type PasswordAuthMiddlewareOptions = {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
    user: {
      username: string;
      password: string;
    };
  };
  scopes?: Array<string>;
  tokenCache?: string;
  oauthUri?: string;
  fetch?: FetchError;
};
