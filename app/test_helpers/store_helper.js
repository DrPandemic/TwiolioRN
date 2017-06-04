// @flow

import { applyMiddleware, compose, createStore } from 'redux';
import { install } from 'redux-loop';

import { initialState, reducer } from '../reducers';

export default function createLoopStore(state: any = {}) {
  const enhancer = compose(
    applyMiddleware(...[]),
    install(),
  );

  return createStore(
    reducer,
    { ...initialState, ...state },
    enhancer
  );
}
