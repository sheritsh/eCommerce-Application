import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import logger from 'redux-logger';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducerObj from './auth/reducer';
import productsReducerDefault from '../features/Products/products-slice';
import categoriesReducerDefault from '../features/Categories/categories-slice';

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducers = combineReducers({
  auth: authReducerObj,
  products: productsReducerDefault,
  categories: categoriesReducerDefault,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
