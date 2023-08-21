// import { useState } from 'react';
import createClient from './client';
import { ILoginRequest, ILoginResponse, IRegisterResponce } from './types';

export const login = (params: ILoginRequest): Promise<ILoginResponse> => {
  return createClient.customerPasswordFlow(params);
};

export const register = (): Promise<IRegisterResponce> => {
  return createClient.clientCredentialsFlow();
};
