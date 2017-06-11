// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NativeRouter, Route } from 'react-router-native';

import { ActionCreators } from '../actions';
import Conversation from './Conversation';
import PhoneNumberMenu from '../components/PhoneNumberMenu';
import ConversationList from '../components/ConversationList';
import { colors } from '../constants';

const styles = StyleSheet.create({
  container: {
  },
  nav: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.primary.normal,
    elevation: 5,
  },
});

const AppContainer = () => (
  <NativeRouter>
    <View style={styles.container}>
      <View style={styles.nav}>
        <PhoneNumberMenu/>
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
