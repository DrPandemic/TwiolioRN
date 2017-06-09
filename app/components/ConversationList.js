// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { Message } from '../types';
import { getConversations, filterByUs } from '../types/ConversationStore';
import type { ConversationStoreT } from '../types/ConversationStore';
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
}

export class PConversationList extends Component {
  props: PropsT;

  static renderRow([message]: Array<Message>) {
    return (
      <ListItem
        key={message.conversationId}
        title={message.conversationUsers.other}
      />
    );
  }

  static renderRows(store: ConversationStoreT, selectedNumber: ?string) {
    return getConversations(
      filterByUs(store, selectedNumber)
    ).map(c => PConversationList.renderRow(c));
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          {
            PConversationList.renderRows(
              this.props.messages.messages,
              this.props.account.selectedNumber
            )
          }
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
