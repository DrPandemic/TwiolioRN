// @flow

import 'es6-symbol/implement';
import 'es7-object-polyfill';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, bindActionCreators, compose, createStore } from 'redux';
import { install } from 'redux-loop';
import { MenuContext } from 'react-native-popup-menu';

import AppContainer from './app/containers/AppContainer';
import { initialState, reducer } from './app/reducers';
import { ActionCreators } from './app/actions';

const enhancer = compose(
  applyMiddleware(...[]),
  install(),
);

const store = createStore(
  reducer,
  initialState,
  enhancer
);

class LoggedApp extends Component {
  props: {
    fetchAccountNumbers: () => Promise<void>,
    fetchMessages: () => Promise<void>,
  };

  componentDidMount() {
    this.props.fetchAccountNumbers();
    this.props.fetchMessages();
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const ConnectLoggedApp = connect(mapStateToProps, mapDispatchToProps)(LoggedApp);

const App = () => (
  <Provider store={store}>
    <MenuContext>
      <ConnectLoggedApp />
    </MenuContext>
  </Provider>
);

AppRegistry.registerComponent('TwilioRN', () => App);
