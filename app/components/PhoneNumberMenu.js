// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, StyleSheet, View } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ActionCreators } from '../actions';
import type { T as FetchedT } from '../reducers/fetchedAccountNumbers';
import type { T as AccountT } from '../reducers/account';
import type { StateT } from '../reducers';
import { PhoneNumber } from '../types';
import { Colors } from '../constants';

const styles = StyleSheet.create({
  text: {
    color: Colors.primary.text,
    fontSize: 20,
  },
  icon: {
    marginTop: 3,
  }
});

export class PPhoneNumberMenu extends Component {
  props: {
    fetchedAccountNumbers: FetchedT,
    account: AccountT,
    selectNumber: ?string => void,
  }

  constructor(props: any): void {
    super(props);

    this.onSelectNumber = this.onSelectNumber.bind(this);
  }

  onSelectNumber(number: ?string): void {
    this.props.selectNumber(number);
  }

  renderNumbers() {
    if (this.props.fetchedAccountNumbers.numbers.length > 0) {
      return (
        <MenuOptions>
          <MenuOption value={null} key={'all'}>
            <Text>See all conversations</Text>
          </MenuOption>
          {
            this.props.fetchedAccountNumbers.numbers.map(
              n => PPhoneNumberMenu.renderNumber(n)
            )
          }
        </MenuOptions>
      );
    }
    return (
      <MenuOptions>
        <MenuOption disabled={true} text={'You have no number'}>
        </MenuOption>
      </MenuOptions>
    );
  }

  static renderNumber(number: PhoneNumber) {
    return (
      <MenuOption value={number.number} key={number.sid}>
        <Text>{number.friendlyName}</Text>
      </MenuOption>
    );
  }

  renderSelectedNumber() {
    const number: ?string = this.props.account.selectedNumber;
    const defaultValue = 'All conversations';
    let displayName = defaultValue;

    if (number !== null) {
      const foundNumber = this.props.fetchedAccountNumbers.numbers.find(
        n => n.number === number
      );

      if (foundNumber === undefined) {
        displayName = defaultValue;
      } else {
        displayName = foundNumber.friendlyName;
      }
    }

    return displayName;
  }

  render() {
    return (
      <Menu onSelect={this.onSelectNumber}>
        <MenuTrigger>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>
              {this.renderSelectedNumber()}
            </Text>
            <Text style={styles.icon}>
              <Icon
                name="arrow-drop-down"
                size={25}
                color={Colors.primary.text}
                style={styles.icon}
              />
            </Text>
          </View>
        </MenuTrigger>
        {this.renderNumbers()}
      </Menu>
    );
  }
}

function mapStateToProps(state: StateT) {
  return {
    fetchedAccountNumbers: state.fetchedAccountNumbers,
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PPhoneNumberMenu);
