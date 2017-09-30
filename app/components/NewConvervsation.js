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
import { Contact } from '../types';
import { getConversations, filterByUs } from '../types/ConversationStore';
import { expandPhoneNumbers } from '../types/Contact';
import { Colors } from '../constants';
import type { StateT } from '../reducers';
import type { T as ContactT } from '../reducers/contacts';
import type { PhoneNumberWithContact } from '../types/Contact';

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
});

type PropsT = {
  contacts: ContactT,
  push: (any) => void,
};

export class PNewConversation extends Component {
  props: PropsT;

  constructor(props: PropsT): void {
    super(props);

    this.onSelectContact = this.onSelectContact.bind(this);
  }

  onSelectContact(row: PhoneNumberWithContact): void {
    this.props.push({
      pathname: '/newConversationSource',
      state: row,
    });
  }

  renderRow(row: PhoneNumberWithContact) {
    return (
      <ListItem
        title={`${row.contact.name} - ${row.phoneNumber}`}
        onPress={() => this.onSelectContact(row)}
        containerStyle={styles.item}
        underlayColor={'#dedede'}
        hideChevron={true}
      />
    );
  }

  render() {
    const numbers = expandPhoneNumbers(this.props.contacts.contacts);

    return (
      <View style={styles.container}>
        <List style={styles.list}>
          <FlatList
            data={numbers}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(row: PhoneNumberWithContact) => [row.contact.recordID, row.phoneNumber].join('')}
            style={styles.flatList}
          />
        </List>
      </View>
    );
  }
}

function mapStateToProps(state: StateT) {
  return {
    contacts: state.contacts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PNewConversation);
