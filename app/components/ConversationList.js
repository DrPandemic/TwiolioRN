// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { Message } from '../types';
import { getConversations, filterByUs } from '../types/ConversationStore';
import * as types from '../actions/types';
import type { StateT } from '../reducers';
import type { T as AccountT } from '../reducers/account';
import type { T as MessagesT } from '../reducers/messages';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});

type PropsT = {
  account: AccountT,
  messages: MessagesT,
  selectConversation: ?string => void,
};

export class PConversationList extends Component {
  props: PropsT;

  renderRow([message]: Array<Message>) {
    return (
      <ListItem
        key={message.conversationId}
        title={message.conversationUsers.other}
        onPress={() => this.props.selectConversation(message.conversationId)}
      />
    );
  }

  renderRows() {
    return getConversations(
      filterByUs(this.props.messages.messages, this.props.account.selectedNumber)
    ).map(c => this.renderRow(c));
  }

  render() {
    console.log(this.props.account);
    return (
      <View style={styles.container}>
        <List>
          {this.renderRows()}
        </List>
      </View>
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
