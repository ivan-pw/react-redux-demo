import { createAction } from '@reduxjs/toolkit';

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const heroesFetching = createAction('HEROES_FETCHING');

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const heroDeleted = createAction('HERO_DELETED');

export const heroCreated = createAction('HERO_CREATED');

export const filtersFetching = () => {
  return { type: 'FILTERS_FETCHING' };
};

export const filtersFetched = (filters) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR',
  };
};

export const activeFilterChanged = (filter) => {
  return {
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter,
  };
};
