// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  View,
  StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ActionCreators } from '../actions';
import { Message } from '../types';
import { getConversations, filterByUs } from '../types/ConversationStore';
import { getNameForMessage } from '../types/Contact';
import { Colors } from '../constants';
import type { StateT } from '../reducers';
import type { T as AccountT } from '../reducers/account';
import type { T as MessagesT } from '../reducers/messages';
import type { T as ContactT } from '../reducers/contacts';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  list: {
    marginTop: 0,
    borderBottomWidth: 0,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0,
  },
  flatList: {
    marginBottom: 30,
  },
  actionButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: Colors.primary.text,
  },
});

type PropsT = {
  account: AccountT,
  messages: MessagesT,
  contacts: ContactT,
  push: (any) => void,
};

export class PConversationList extends Component {
  props: PropsT;

  constructor(props: PropsT): void {
    super(props);

    this.onSelectConversation = this.onSelectConversation.bind(this);
  }

  onSelectConversation(message: Message): void {
    this.props.push({
      pathname: '/conversation',
      state: {
        conversationId: message.conversationId,
        to: message.conversationUsers.other,
        from: message.conversationUsers.us,
      },
    });
  }

  renderRow([message]: Array<Message>) {
    return (
      <ListItem
        key={message.conversationId}
        title={getNameForMessage(this.props.contacts.contacts, message)}
        onPress={() => this.onSelectConversation(message)}
        containerStyle={styles.item}
        underlayColor={'#dedede'}
      />
    );
  }

  render() {
    const messages = getConversations(filterByUs(
      this.props.messages.messages,
      this.props.account.selectedNumber
    ));
    return (
      <View style={styles.container}>
        <List style={styles.list}>
          <FlatList
            data={messages}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={([message]) => message.sid}
            style={styles.flatList}
          />
        </List>
        <ActionButton style={styles.actionButton} buttonColor={Colors.primary.normal} />
      </View>
    );
  }
}

function mapStateToProps(state: StateT) {
  return {
    account: state.account,
    messages: state.messages,
    contacts: state.contacts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PConversationList);
