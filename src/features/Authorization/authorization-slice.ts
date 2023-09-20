import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

import { ILoginRequest } from '../../api/types';
import { login } from '../../api/auth';

export interface AuthState {
  authData: {
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
    credentials: {
      login: string;
      password: string;
    };
  };
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    isLoading: false,
    error: null,
    credentials: {
      login: '',
      password: '',
    },
  },
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
      },
    }),
    loginSuccess: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loginFailure: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload,
      },
    }),
    removeLoginError: (state): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        error: null,
      },
    }),
    logout: (state): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: null,
      },
    }),
    saveCredentials: (state, action: PayloadAction<AuthState['authData']['credentials']>): AuthState => ({
      ...state,
      authData: {
        ...state.authData,
        credentials: {
          login: action.payload.login,
          password: action.payload.password,
        },
      },
    }),
  },
});

export const { loginStart, loginSuccess, loginFailure, removeLoginError, logout, saveCredentials } =
  authReducer.actions;

export default authReducer.reducer;

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      const response = await login(data);
      dispatch(loginSuccess(response.access_token));
    } catch (e: unknown) {
      if (e instanceof Error) dispatch(loginFailure(e.message));
    }
  };
