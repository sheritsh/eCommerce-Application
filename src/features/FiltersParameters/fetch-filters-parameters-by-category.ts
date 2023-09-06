import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { register } from '../../api/auth';
import Endpoints from '../../api/endpoints';
import { Settings } from '../../api/types';
import { getFiltersDataStart, getFiltersDataFailure, getFiltersDataSuccess } from './filters-parameters-slice';

export const fetchFiltersDataByCategory =
  (categoryId: string, limit: number = Settings.ProductsPerPage) =>
  async (dispatch: Dispatch): Promise<void> => {
    const endpoint = `${Endpoints.GET_PRODUCTS_BY_CATEGORY}"${categoryId}"&limit=${limit}`;
    const token = await register();
    try {
      dispatch(getFiltersDataStart());
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const products = response.data.results;
      dispatch(getFiltersDataSuccess(products));
    } catch (e: unknown) {
      if (e instanceof Error) dispatch(getFiltersDataFailure(e.message));
      throw new Error('Something went wrong while fetching products from category');
    }
  };
