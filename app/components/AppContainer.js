// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AndroidBackButton, Route, withRouter } from 'react-router-native';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, bindActionCreators, compose, createStore } from 'redux';
import { install } from 'redux-loop';
import { MenuContext } from 'react-native-popup-menu';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { ActionCreators } from '../actions';
import Conversation from './Conversation';
import PhoneNumberMenu from './PhoneNumberMenu';
import ConversationMenu from './ConversationMenu';
import ConversationList from './ConversationList';
import Interval from './Interval';
import { Colors } from '../constants';
import { initialState, reducer } from '../reducers';

const styles = StyleSheet.create({
  container: {
  },
  nav: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.primary.normal,
    elevation: 5,
  },
});

const history = createHistory();
const enhancer = compose(applyMiddleware(routerMiddleware(history)), install());
export const store = createStore(reducer, initialState, enhancer);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(() => (
  <View style={styles.container}>
    <Interval />
    <AndroidBackButton />

    <View style={styles.nav}>
      <Route exact path="/" component={PhoneNumberMenu}/>
      <Route path="/conversation" component={ConversationMenu}/>
    </View>

    <Route exact path="/" component={ConversationList}/>
    <Route path="/conversation" component={Conversation}/>
  </View>
)));

export default function AppContainer() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MenuContext>
          <Container />
        </MenuContext>
      </ConnectedRouter>
    </Provider>
  );
}
