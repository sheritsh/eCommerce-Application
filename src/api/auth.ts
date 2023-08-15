// import { useState } from 'react';
import createClient from './client';
import { ILoginRequest } from './types';

export const login = (params: ILoginRequest): Promise<Response> => {
  return createClient.customerPasswordFlow(params);
};
