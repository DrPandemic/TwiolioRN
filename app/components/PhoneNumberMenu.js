// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text } from 'react-native';
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';

import { ActionCreators } from '../actions';
import type { T as FetchedT } from '../reducers/fetchedAccountNumbers';
import type { T as AccountT } from '../reducers/account';
import { PhoneNumber } from '../actions/types';

class PhoneNumberMenu extends Component {
  props: {
    fetchedAccountNumbers: FetchedT,
    account: AccountT,
    selectNumber: (?string) => void,
  }

  constructor(props) {
    super(props);

    this.onSelectNumber = this.onSelectNumber.bind(this);
  }

  onSelectNumber(number: ?string) {
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
              n => PhoneNumberMenu.renderNumber(n)
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
      <MenuOption value={number.sid} key={number.sid}>
        <Text>{number.friendlyName}</Text>
      </MenuOption>
    );
  }

  render() {
    return (
      <Menu onSelect={this.onSelectNumber}>
        <MenuTrigger>
          <Text style={{ fontSize: 20 }}>&#8942;</Text>
        </MenuTrigger>
        {this.renderNumbers()}
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchedAccountNumbers: state.fetchedAccountNumbers,
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberMenu);
