import { Dispatch } from '@reduxjs/toolkit';
import { ILoginRequest } from '../../api/types';
import { loginStart, loginSucess, loginFailure } from './reducer';
import { login } from '../../api/auth';

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      const response = await login(data);
      dispatch(loginSucess(response.access_token));
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) dispatch(loginFailure(e.message));
    }
  };
