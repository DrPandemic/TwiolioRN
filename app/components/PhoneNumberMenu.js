// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Text,
} from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { ActionCreators } from '../actions';
import { PhoneNumber } from '../actions/types';

class AppContainer extends Component {
  props: {
    fetchedAccountNumbers: Array<PhoneNumber>,
  };

  renderNumbers() {
    if (this.props.fetchedAccountNumbers.length > 0) {
      return (
        <MenuOptions>
          {this.props.fetchedAccountNumbers.map(n => AppContainer.renderNumber(n))}
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
      <Menu onSelect={value => alert(`User selected the number ${value}`)}>
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
