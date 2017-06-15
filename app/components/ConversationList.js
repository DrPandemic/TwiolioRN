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

import { ActionCreators } from '../actions';
import { Message } from '../types';
import { getConversations, filterByUs } from '../types/ConversationStore';
import { Colors } from '../constants';
import type { StateT } from '../reducers';
import type { T as AccountT } from '../reducers/account';
import type { T as MessagesT } from '../reducers/messages';

const screenHeight = Dimensions.get(`window`).height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.background,
    height: screenHeight,
  },
  list: {
    marginTop: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.background,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  flatList: {
    marginBottom: 30,
  },
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
        <List containerStyle={styles.list}>
          <FlatList
            data={messages}
            renderItem={({item}) => this.renderRow(item)}
            keyExtractor={([message]) => message.sid}
            style={styles.flatList}
          />
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
