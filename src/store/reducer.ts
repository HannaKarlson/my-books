import {combineReducers} from '@reduxjs/toolkit';
import colormodeReducer from './colormode';
import favoritesReducer from './favorites';

export default combineReducers({
  colormode: colormodeReducer,
  favorites: favoritesReducer,
});
