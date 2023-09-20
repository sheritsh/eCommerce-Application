import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '../../api/types';

interface IPaginationState {
  page: number;
  offset: number;
}

const initialState: IPaginationState = {
  page: 1,
  offset: 0,
};

export const PaginationReducer = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>): IPaginationState => ({
      ...state,
      page: action.payload,
      offset: (action.payload - 1) * Settings.ProductsPerPage,
    }),
  },
});

export const { setPage } = PaginationReducer.actions;

export default PaginationReducer.reducer;
