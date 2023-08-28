import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import logger from 'redux-logger';
import authReducerObj from './auth/reducer';
import productsReducerDefault from '../features/Products/products-slice';
import categoriesReducerDefault from '../features/Categories/categories-slice';

export const store = configureStore({
  reducer: {
    auth: authReducerObj,
    products: productsReducerDefault,
    categories: categoriesReducerDefault,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
