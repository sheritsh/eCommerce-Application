import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENV from '../../api/env';
import { ICustomer, ICustomerState } from './types';

const initialState: ICustomerState = {
  customerData: {
    result: {} as ICustomer,
    status: false,
    error: null,
  },
};

export const fetchCustomer = createAsyncThunk('customer/fetchCustomer', async (token: string | null) => {
  const response = await fetch(`${ENV.Host}/${ENV.ProjectKey}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
});

const customerReducer = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => ({
        ...state,
        customerData: {
          ...state.customerData,
          status: true,
          error: null,
        },
      }))
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        return {
          ...state,
          customerData: {
            ...state.customerData,
            result: action.payload,
            status: false,
            error: null,
          },
        };
      })
      .addCase(fetchCustomer.rejected, (state, action) => ({
        ...state,
        customerData: {
          ...state.customerData,
          status: false,
          error: action.payload as string,
        },
      }));
  },
});

export default customerReducer.reducer;
