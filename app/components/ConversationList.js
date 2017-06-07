// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text } from 'react-native';

import { ActionCreators } from '../actions';
import { PhoneNumber, Message } from '../types';
import type { StateT } from '../reducers';

export class ConversationList extends Component {
  props: {
    /* fetchedAccountNumbers: FetchedT,
     * account: AccountT,
     * selectNumber: ?string => void,*/
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
