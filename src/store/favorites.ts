import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './configureStore';
import type {Book} from '../types';

type FavoritesState = Book[];

const initialState: FavoritesState = [];

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (favorites, action: PayloadAction<Book>) => {
      favorites.push(action.payload);
    },
    removeFavorite: (favorites, action: PayloadAction<string>) => {
      return favorites.filter(favorite => favorite.key !== action.payload);
    },
  },
});
export const {addFavorite, removeFavorite} = slice.actions;

export const selectFavorites = (state: RootState) => state.favorites;

export default slice.reducer;
