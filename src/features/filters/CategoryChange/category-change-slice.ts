import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICategoryChangeState {
  categoryId: string;
}

const initialState: ICategoryChangeState = {
  categoryId: '',
};

export const categoryChangeReducer = createSlice({
  name: 'categoryChange',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>): ICategoryChangeState => ({
      ...state,
      categoryId: action.payload,
    }),
  },
});

export const { setCategoryId } = categoryChangeReducer.actions;

export default categoryChangeReducer.reducer;
