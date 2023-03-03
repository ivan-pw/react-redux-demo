import { createReducer } from '@reduxjs/toolkit';

import {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
  heroCreated,
  heroDeleted,
} from '../actions';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroes = createReducer(
  initialState,
  {
    // нельзя без {} - будет отрабатывать как return,
    // а тогда будут проблемы с иммутабельностью - без return библа все делает сама
    [heroesFetched]: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload;
    },
    [heroesFetching]: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    [heroesFetchingError]: (state) => {
      state.heroesLoadingStatus = 'error';
    },
    [heroCreated]: (state, action) => {
      state.heroes.push(action.payload);
    },
    [heroDeleted]: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  [],
  (state) => state
);

export default heroes;
