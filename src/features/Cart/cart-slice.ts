import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Endpoints from '../../api/endpoints';
import { ICartState } from './types';

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (accessToken: string | null) => {
  const response = await fetch(`${Endpoints.GET_CARTS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status} ${response}`);
  }
  const data = await response.json();
  return data.results[0];
});

const initialState: ICartState = {
  cartData: {
    cartId: '',
    actualCartVer: 0,
    cartAmount: 0,
    cartItems: [],
  },
  isLoaded: false,
  status: null,
  error: null,
};

export const CartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      const { id, version, lineItems } = action.payload;
      const {
        totalPrice: { centAmount },
      } = action.payload;

      return {
        ...state,
        cartData: {
          ...state.cartData,
          cartId: id,
          actualCartVer: version,
          cartAmount: centAmount / 100,
          cartItems: lineItems,
        },
        isLoaded: true,
        status: 'succeeded',
        error: null,
      };
    });

    builder.addCase(fetchCartItems.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message as string | null,
        status: 'failed',
      };
    });
  },
});

// export const { } = CartReducer.actions;

export default CartReducer.reducer;