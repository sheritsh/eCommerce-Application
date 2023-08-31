import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducerObj from './auth/reducer';
import productsReducerDefault from '../features/Products/products-slice';
import categoriesReducerDefault from '../features/Categories/categories-slice';
import productsByCategoryIdReducerDefault from '../features/filters/ProductsByCategoryId/products-by-category-id-slice';
import detailedProductReducerDefault from '../features/DetailedProducts/detailed-products-slice';

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducers = combineReducers({
  auth: authReducerObj,
  products: productsReducerDefault,
  categories: categoriesReducerDefault,
  productsByCategoryId: productsByCategoryIdReducerDefault,
  detailedProduct: detailedProductReducerDefault,
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
  devTools: true,
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
