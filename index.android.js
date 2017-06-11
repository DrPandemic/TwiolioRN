// @flow

import 'es6-symbol/implement';
import 'es7-object-polyfill';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, bindActionCreators, compose, createStore } from 'redux';
import { install } from 'redux-loop';
import { MenuContext } from 'react-native-popup-menu';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { withRouter } from 'react-router-native';

import AppContainer from './app/containers/AppContainer';
import { initialState, reducer } from './app/reducers';
import { ActionCreators } from './app/actions';

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
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
const ConnectLoggedApp = withRouter(connect(() => ({}), mapDispatchToProps) (LoggedApp));

const history = createHistory();
const enhancer = compose(applyMiddleware(routerMiddleware(history)), install());
const store = createStore(reducer, initialState, enhancer);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MenuContext>
        <ConnectLoggedApp />
      </MenuContext>
    </ConnectedRouter>
  </Provider>
);

AppRegistry.registerComponent('TwilioRN', () => App);
