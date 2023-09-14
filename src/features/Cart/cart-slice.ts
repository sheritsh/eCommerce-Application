import axios from 'axios';
import { createSlice, createAsyncThunk, MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { createCart, createCartAsync, getHasCart } from '../../api/cart';
import Endpoints from '../../api/endpoints';
import { ICartState, IApllyPromocode, IRemovePromocode } from './types';
import { login } from '../../api/auth';

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (accessToken: string | null) => {
  const hasCart = await getHasCart(accessToken);
  if (hasCart) {
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
  }
  createCart(accessToken);
  // const cart = await fetchCartItems(accessToken);
  return null;
});

export const fetchPromocodeData = createAsyncThunk(
  'cart/fetchPromocodeData',
  async ({
    promocode = '',
    cartId = '',
    cartVersion = 0,
    username = '3420922@gmail.com',
    password = 'Aa12345678',
  }: IApllyPromocode) => {
    const token = await login({
      username,
      password,
    });
    const response = await axios.post(
      `${Endpoints.GET_CARTS}${cartId}`,
      {
        version: cartVersion,
        actions: [
          {
            action: 'addDiscountCode',
            code: promocode,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );
    return response;
  },
);

export const fetchPromocodeDataRemove = createAsyncThunk(
  'cart/fetchPromocodeDataRemove',
  async ({
    promocodeId = '',
    cartId = '',
    cartVersion = 0,
    username = '3420922@gmail.com',
    password = 'Aa12345678',
  }: IRemovePromocode) => {
    const token = await login({
      username,
      password,
    });
    const response = await axios.post(
      `${Endpoints.GET_CARTS}${cartId}`,
      {
        version: cartVersion,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId: 'discount-code',
              id: promocodeId,
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );
    return response;
  },
);

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
  promocodeAnswer: null,
};

// setPrice: (state, action: PayloadAction<number[]>): IFiltersState => ({
//   ...state,
//   productsForFiltersData: {
//     ...state.productsForFiltersData,
//     filtersData: {
//       ...state.productsForFiltersData.filtersData,
//       price: action.payload,
//     },
//     isLoading: false,
//     error: null,
//   },
// }),

export const CartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setActualCartVer: (state, action) => ({
      ...state,
      cartData: {
        ...state.cartData,
        actualCartVer: action.payload,
      },
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      if (!action.payload) return state;
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

    builder
      .addCase(fetchPromocodeData.pending, (state) => ({
        ...state,
        isLoaded: false,
        status: 'pending',
        error: null,
      }))
      .addCase(fetchPromocodeData.fulfilled, (state, action) => {
        if (!action.payload) return state;
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
      })
      .addCase(fetchPromocodeData.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string | null,
        status: 'failed',
      }));

    builder
      .addCase(fetchPromocodeDataRemove.pending, (state) => ({
        ...state,
        isLoaded: false,
        status: 'pending',
        error: null,
      }))
      .addCase(fetchPromocodeDataRemove.fulfilled, (state, action) => {
        if (!action.payload) return state;
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
      })
      .addCase(fetchPromocodeDataRemove.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string | null,
        status: 'failed',
      }));
  },
});

export const { setActualCartVer } = CartReducer.actions;

export default CartReducer.reducer;
