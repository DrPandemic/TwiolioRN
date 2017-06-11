// @flow

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NativeRouter, Route, Link } from 'react-router-native';

import { ActionCreators } from '../actions';
import Conversation from './Conversation';
import PhoneNumberMenu from '../components/PhoneNumberMenu';
import ConversationList from '../components/ConversationList';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  nav: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    paddingBottom: 10,
  },
});


const AppContainer = () => (
  <NativeRouter>
    <View style={styles.container}>
      <View style={styles.nav}>
        <PhoneNumberMenu></PhoneNumberMenu>
      </View>

      <Route exact path="/" component={ConversationList}/>
      <Route path="/conversation" component={Conversation}/>
    </View>
  </NativeRouter>
);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
