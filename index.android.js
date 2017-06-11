// @flow

import 'es6-symbol/implement';
import 'es7-object-polyfill';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { install } from 'redux-loop';
import { MenuContext } from 'react-native-popup-menu';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import AppContainer from './app/components/AppContainer';
import { initialState, reducer } from './app/reducers';

const history = createHistory();
const enhancer = compose(applyMiddleware(routerMiddleware(history)), install());
const store = createStore(reducer, initialState, enhancer);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MenuContext>
        <AppContainer />
      </MenuContext>
    </ConnectedRouter>
  </Provider>
);

AppRegistry.registerComponent('TwilioRN', () => App);
