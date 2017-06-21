// @flow

import 'es6-symbol/implement';
import 'es7-object-polyfill';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { MenuContext } from 'react-native-popup-menu';
import { ConnectedRouter } from 'react-router-redux';

import AppContainer from './app/components/AppContainer';
import { history, store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MenuContext>
          <AppContainer />
        </MenuContext>
      </ConnectedRouter>
    </Provider>
  );
}

AppRegistry.registerComponent('TwilioRN', () => App);
