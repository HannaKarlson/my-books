import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './configureStore';

type ColormodeState = string;

const initialState: ColormodeState = 'light';

const slice = createSlice({
  name: 'colormode',
  initialState,
  reducers: {
    updateColormode: (colormode, action: PayloadAction<'light' | 'dark'>) => {
      return action.payload;
    },
  },
});
export const {updateColormode} = slice.actions;

export const selectColormode = (state: RootState) => state.colormode;

export default slice.reducer;
