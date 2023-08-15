export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
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
}
