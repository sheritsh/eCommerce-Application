import { fetchCartItems } from '../features/Cart/cart-slice';
import Endpoints from './endpoints';

const createBody = {
  currency: 'USD',
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

export const getHasCart = async (accessToken: string | null): Promise<boolean> => {
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
  return (dispatch): void => {
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
