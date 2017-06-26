// @flow

import { install } from 'redux-loop';
import createHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import { initialState, reducer } from './reducers';

export const history = createHistory();
const composeEnhancers = composeWithDevTools(
  { realtime: true, port: 8000, hostname: 'localhost' }
);
const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history)),
  install(),
);
export const store = createStore(reducer, initialState, enhancer);
