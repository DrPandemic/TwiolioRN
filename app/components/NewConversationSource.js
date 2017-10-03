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
import { Colors } from '../constants';
import type { StateT } from '../reducers';
import PhoneNumber from '../types/PhoneNumber';
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
  numbers: Array<PhoneNumber>,
  recipient: PhoneNumberWithContact,
  startNewConversation: (PhoneNumber, PhoneNumberWithContact) => void,
};

export class PNewConversationSource extends Component {
  props: PropsT;

  constructor(props: PropsT): void {
    super(props);

    this.onSelectContact = this.onSelectContact.bind(this);
  }

  onSelectContact(row: PhoneNumber): void {
    this.props.startNewConversation(row, this.props.recipient);
  }

  renderRow(row: PhoneNumber) {
    return (
      <ListItem
        title={row.friendlyName}
        onPress={() => this.onSelectContact(row)}
        containerStyle={styles.item}
        underlayColor={'#dedede'}
        hideChevron={true}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <List style={styles.list}>
          <FlatList
            data={this.props.numbers}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(row: PhoneNumber) => row.sid}
            style={styles.flatList}
          />
        </List>
      </View>
    );
  }
}

function mapStateToProps(state: StateT) {
  return {
    numbers: state.fetchedAccountNumbers.numbers,
    recipient: state.router.location.state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PNewConversationSource);
