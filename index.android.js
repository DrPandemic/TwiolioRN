import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux'
import thunkMiddleware from 'redux-thunk'

import AppContainer from './app/containers/AppContainer'
import reducer from './app/reducers'
import { ActionCreators } from './app/actions';


function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

class LoggedApp extends Component {
  props: {
    fetchAccountNumbers: () => void,
  };

  componentDidMount() {
    this.props.fetchAccountNumbers();
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

const ConnectLoggedApp = connect(() => {return {};}, mapDispatchToProps)(LoggedApp);

const App = () => (
  <Provider store={store}>
    <ConnectLoggedApp />
  </Provider>
)

AppRegistry.registerComponent('TwilioRN', () => App);
