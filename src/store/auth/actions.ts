import { Dispatch } from '@reduxjs/toolkit';
import { ILoginRequest } from '../../api/types';
import { loginStart, loginSuccess, loginFailure } from './reducer';
import { login } from '../../api/auth';

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      const response = await login(data);
      dispatch(loginSuccess(response.access_token));
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) dispatch(loginFailure(e.message));
      throw new Error('Customer account with the given credentials not found');
    }
  };
