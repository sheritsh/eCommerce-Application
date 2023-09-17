import createClient from './client';
import ENV from './env';
import { ILoginRequest, ILoginResponse, IRegisterResponce } from './types';

export const login = (params: ILoginRequest): Promise<ILoginResponse> => {
  return createClient.customerPasswordFlow(params);
};

export const register = (): Promise<IRegisterResponce> => {
  return createClient.clientCredentialsFlow();
};

export const anonymousSession = (): Promise<IRegisterResponce> => {
  return createClient.anonymousFlow();
};
