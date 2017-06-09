// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { Message } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  ourMessage: {
    flex: 1,
    color: '#111111'
  },
  otherMessage: {
    flex: 1,
    color: '#aaaaaa'
  },
});

type PropsT = {
  messages: Array<Message>,
}

export class PConversation extends Component {
  props: PropsT;

  static renderUs(message: Message) {
    return (
      <ListItem
        style={styles.ourMessage}
        key={message.conversationId}
        title={message.conversationUsers.other}
      />
    );
  }

  static renderOther(message: Message) {
    return (
      <ListItem
        style={styles.otherMessage}
        key={message.conversationId}
        title={message.conversationUsers.other}
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
    return (
      <View style={styles.container}>
        <List>
          {
            PConversation.renderRows(this.props.messages)
          }
        </List>
      </View>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PConversation);
