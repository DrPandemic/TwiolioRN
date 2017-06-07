// @flow

import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from './ConversationListRow';
import { ActionCreators } from '../actions';
import { PhoneNumber, Message } from '../types';
import type { ConversationStoreT } from '../types/ConversationStore';
import type { StateT } from '../reducers';
import type { T as AccountT } from '../reducers/account';
import type { T as MessagesT } from '../reducers/messages';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

type PropsT = {
  account: AccountT,
  messages: MessagesT,
}

export class PConversationList extends Component {
  props: PropsT;

  state: {|
    messages: ConversationStoreT,
    dataSource: any,
  |};

  constructor(props: PropsT) {
    super(props);

    this.state = {
      messages: props.messages.messages,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    };
  }

  componentWillReceiveProps(nextProps: PropsT) {
    this.setState({
      messages: nextProps.messages.messages,
      dataSource: this.state.dataSource
                      .cloneWithRows(Object.entries(nextProps.messages.messages))
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={entry => <Row entry={entry}/>}
          renderSeparator={
            (sectionId, rowId) => <View key={rowId} style={styles.separator} />
          }
        />
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
