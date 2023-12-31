import axios from 'axios';
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import Endpoints from '../../api/endpoints';
import { ICartState, IApllyPromocode, IRemovePromocode } from './types';
import { login, anonymousSession } from '../../api/auth';

const createBody = {
  currency: 'USD',
};

export const getHasCart = async (accessToken: string): Promise<boolean> => {
  const response = await fetch(`${Endpoints.GET_CARTS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  if (!data.results[0]) {
    return false;
  }

  return true;
};

export const createCart = (accessToken: string | null): Promise<void> => {
  return new Promise((resolve) => {
    fetch(`${Endpoints.GET_CARTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(createBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return resolve(data);
      });
  });
};

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (accessToken: string = '') => {
  const isGuest = !accessToken;
  const anonToken = localStorage.getItem('anonymousToken');
  const token = accessToken || anonToken || (await anonymousSession()).access_token;
  const hasCart = await getHasCart(token);

  if (hasCart) {
    const response = await fetch(`${Endpoints.GET_CARTS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response}`);
    }
    const data = await response.json();
    return data.results[0];
  }

  await createCart(token);

  const response = await fetch(`${Endpoints.GET_CARTS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status} ${response}`);
  }
  const data = await response.json();

  if (isGuest) {
    if (!localStorage.getItem('anonymousToken')) {
      localStorage.setItem('anonymousToken', `${token}`);
      localStorage.setItem('anonymousCart', data.results[0].id);
    }
  }

  return data.results[0];
});

export const getMyCart = (accessToken: string | null): void => {
  fetch(`${Endpoints.GET_CARTS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const deleteMyCart = (accessToken: string | null, id: string, version: number = 1): void => {
  fetch(`${Endpoints.GET_CARTS}${id}?version=${version}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const addItemToCart = (
  accessToken: string | undefined,
  cartId: string,
  itemId: string,
  amount: number = 1,
  version: number = 1,
) => {
  return (dispatch: Dispatch): void => {
    fetch(`${Endpoints.GET_CARTS}${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'addLineItem',
            productId: itemId,
            variantId: 1,
            quantity: amount,
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        if (accessToken) dispatch(fetchCartItems(accessToken));
      });
  };
};

export const removeItemFromCart = (
  accessToken: string | undefined,
  cartId: string,
  itemId: string,
  amount: number = 1,
  version: number = 1,
) => {
  return (dispatch: Dispatch): void => {
    fetch(`${Endpoints.GET_CARTS}${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: itemId,
            variantId: 1,
            quantity: amount,
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        if (accessToken) dispatch(fetchCartItems(accessToken));
      });
  };
};

export const fetchPromocodeData = createAsyncThunk(
  'cart/fetchPromocodeData',
  async ({ promocode = '', cartId = '', cartVersion = 0, username = '', password = '' }: IApllyPromocode) => {
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
    return response.data;
  },
);

export const fetchPromocodeDataRemove = createAsyncThunk(
  'cart/fetchPromocodeDataRemove',
  async ({ promocodeId = '', cartId = '', cartVersion = 0, username = '', password = '' }: IRemovePromocode) => {
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
    return response.data;
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
  isPromocodeActive: false,
  promocodeId: '',
  fullPrice: 0,
};

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
    addAnonToken: (state, action) => ({
      ...state,
      anonymousToken: action,
    }),
    clearCartState: () => ({
      ...initialState,
    }),
    resetPromocode: (state) => ({
      ...state,
      isPromocodeActive: false,
      promocodeId: '',
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
        isPromocodeActive: false,
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
          fullPrice: state.fullPrice ? state.fullPrice : state.cartData.cartAmount,
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
          isPromocodeActive: true,
          promocodeId: action.payload.discountCodes[0]?.discountCode?.id,
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
          isPromocodeActive: false,
          promocodeId: '',
          fullPrice: 0,
        };
      })
      .addCase(fetchPromocodeDataRemove.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string | null,
        status: 'failed',
      }));
  },
});

export const { setActualCartVer, addAnonToken, clearCartState, resetPromocode } = CartReducer.actions;

export default CartReducer.reducer;
