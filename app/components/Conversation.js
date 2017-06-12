// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { Message } from '../types';
import { getMessagesById } from '../types/ConversationStore';
import type { StateT } from '../reducers';
import type { T as MessagesT } from '../reducers/messages';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  list: {
    marginTop: 0,
  },
  ourMessage: {
    backgroundColor: '#111111'
  },
  otherMessage: {
    backgroundColor: '#aaaaaa'
  },
});

type PropsT = {
  messages: MessagesT,
  location: { state: any }
}

export class PConversation extends Component {
  props: PropsT;

  static renderUs(message: Message) {
    return (
      <ListItem
        key={message.sid}
        title={message.body}
        style={styles.ourMessage}
      />
    );
  }

  static renderOther(message: Message) {
    return (
      <ListItem
        key={message.sid}
        title={message.body}
        style={styles.otherMessage}
      />
    );
  }

  static renderRows(messages: Array<Message>) {
    return messages.map(m => {
      if (m.isInbound) {
        return PConversation.renderUs(m);
      }
      return PConversation.renderOther(m);
    });
  }

  render() {
    const store = this.props.messages.messages;
    const conversationId = this.props.location.state;

    return (
      <View style={styles.container}>
        <List style={styles.list}>
          {PConversation.renderRows(getMessagesById(store, conversationId))}
        </List>
      </View>
    );
  }
}

function mapStateToProps(state: StateT) {
  return {
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PConversation);
