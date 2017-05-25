import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import AppContainer from './app/containers/AppContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './app/reducers'


function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent('TwilioRN', () => App);
