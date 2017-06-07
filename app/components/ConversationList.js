// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text } from 'react-native';

import { ActionCreators } from '../actions';
import { PhoneNumber, Message } from '../types';
import type { StateT } from '../reducers';
import type { T as AccountT } from '../reducers/account';
import type { T as MessagesT } from '../reducers/messages';

export class PConversationList extends Component {
  props: {
     account: AccountT,
    messages: MessagesT,
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Text style={{ paddingTop: 60 }}>
        123
      </Text>
    );
  }
}

function mapStateToProps(state: StateT) {
  return {
    account: state.account,
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PConversationList);
