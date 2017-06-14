// @flow

import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { Message } from '../types';
import { getMessagesById } from '../types/ConversationStore';
import { colors } from '../constants';
import type { StateT } from '../reducers';
import type { T as MessagesT } from '../reducers/messages';

const screenHeight = Dimensions.get(`window`).height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    height: screenHeight,
  },
  list: {
    marginTop: 0,
  },
  ourMessage: {
    margin: 10,
    marginLeft: 50,
    marginRight: 30,
  },
  otherMessage: {
    margin: 10,
    marginRight: 50,
  },
  ourTitle: {
    textAlign: 'right',
  },
  otherTitle: {
    color: colors.primary.text,
  },
  ourMessageBody: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  otherMessageBody: {
    backgroundColor: colors.primary.light,
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 10,
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
        title={
          <View style={styles.ourMessageBody}>
            <Text style={styles.ourTitle}>
              {message.body}
            </Text>
          </View>
        }
        style={styles.ourMessage}
        hideChevron={true}
      />
    );
  }

  static renderOther(message: Message) {
    return (
      <ListItem
        key={message.sid}
        title={
          <View style={styles.otherMessageBody}>
            <Text style={styles.otherTitle}>
              {message.body}
            </Text>
          </View>
        }
        style={styles.otherMessage}
        hideChevron={true}
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
