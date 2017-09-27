// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReversedFlatList from 'react-native-reversed-flat-list';

import { ActionCreators } from '../actions';
import { Message } from '../types';
import { getMessagesById } from '../types/ConversationStore';
import { Colors } from '../constants';
import WriteBox from './WriteBox';
import type { StateT } from '../reducers';
import type { T as MessagesT } from '../reducers/messages';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    width,
  },
  flatList: {
    flex: 1,
    // Size of the write box
    marginBottom: 50,
    backgroundColor: Colors.background,
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
    color: Colors.primary.text,
  },
  ourMessageBody: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  otherMessageBody: {
    backgroundColor: Colors.primary.light,
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 10,
  },
});

type PropsT = {
  messages: MessagesT,
  location: {
    state: {
      conversationId: string,
      to: string,
      from: string,
    }
  }
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

  static renderRow(message: Message) {
    if (message.isInbound) {
      return PConversation.renderUs(message);
    }
    return PConversation.renderOther(message);
  }

  render() {
    const store = this.props.messages.messages;
    const { conversationId, to, from } = this.props.location.state;
    const messages = getMessagesById(store, conversationId);

    return (
      <View>
        <View style={styles.listContainer} >
          <ReversedFlatList
            data={messages}
            renderItem={({ item }) => PConversation.renderRow(item)}
            keyExtractor={message => message.sid}
            style={styles.flatList}
          />
        </View>
        <WriteBox
          to={to}
          from={from}
        />
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
