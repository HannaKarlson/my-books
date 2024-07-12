import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (favorites, action) => {
      favorites.push(action.payload);
    },
    removeFavorite: (favorites, action) => {
      return favorites.filter(favorite => favorite.worksKey !== action.payload);
    },
  },
});
export const {addFavorite, removeFavorite} = slice.actions;

export const selectFavorites = state => state.favorites;

export default slice.reducer;
