// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { ActionCreators } from '../actions';
import { PhoneNumber } from '../actions/types';

class AppContainer extends Component {
  props: {
    accountNumbers: Array<PhoneNumber>,
  };

  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <Text onPress={Actions.conversation}>
          asd
          {this.props.accountNumbers.map(n => n.friendlyName).join(', ')}
        </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountNumbers: state.accountNumbers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
