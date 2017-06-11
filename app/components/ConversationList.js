// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { Message } from '../types';
import { getConversations, filterByUs } from '../types/ConversationStore';
import type { StateT } from '../reducers';
import type { T as AccountT } from '../reducers/account';
import type { T as MessagesT } from '../reducers/messages';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  list: {
    marginTop: 0,
  }
});

type PropsT = {
  account: AccountT,
  messages: MessagesT,
  selectConversation: ?string => void,
  push: (string, any) => void,
};

export class PConversationList extends Component {
  props: PropsT;

  constructor(props: PropsT): void {
    super(props);

    this.onSelectConversation = this.onSelectConversation.bind(this);
  }

  onSelectConversation(id: string): void {
    this.props.push('/conversation', id);
  }

  renderRow([message]: Array<Message>) {
    return (
        <ListItem
          key={message.conversationId}
          title={message.conversationUsers.other}
          onPress={() => this.onSelectConversation(message.conversationId)}
        />
    );
  }

  renderRows() {
    return getConversations(
      filterByUs(this.props.messages.messages, this.props.account.selectedNumber)
    ).map(c => this.renderRow(c));
  }

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={styles.list}>
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
