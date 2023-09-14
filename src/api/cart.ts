import { createAsyncThunk } from '@reduxjs/toolkit';
import Endpoints from './endpoints';

const createBody = {
  currency: 'USD',
};

export const createCart = (accessToken: string | null): void => {
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
      console.error('Successful created:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const getHasCart = async (accessToken: string | null): Promise<boolean> => {
  try {
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

    if (!data.results) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getMyCart = (accessToken: string | null): void => {
  fetch(`${Endpoints.GET_CARTS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.results[0]) {
        console.error('Empty cart');
        return;
      }
      console.error('Successful answer:', data.results[0]);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const deleteMyCart = (accessToken: string | null, id: string, version: number = 1): void => {
  fetch(`${Endpoints.GET_CARTS}/${id}?version=${version}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.error('Successful deleted:', data);
    })
    .catch((error) => {
      // CART NOT FOUND
      console.error('Error:', error);
    });
};
