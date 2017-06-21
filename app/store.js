// @flow

import { install } from 'redux-loop';
import createHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';

import { initialState, reducer } from './reducers';

export const history = createHistory();
const enhancer = compose(applyMiddleware(routerMiddleware(history)), install());
export const store = createStore(reducer, initialState, enhancer);
