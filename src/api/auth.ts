// import { useState } from 'react';
import createClient from './client';
import { ILoginRequest, ILoginResponse } from './types';

export const login = (params: ILoginRequest): Promise<ILoginResponse> => {
  return createClient.customerPasswordFlow(params);
};
