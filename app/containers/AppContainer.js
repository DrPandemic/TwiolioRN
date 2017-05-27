// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import { ActionCreators } from '../actions';
import { PhoneNumber } from '../actions/types';

class AppContainer extends Component {
  props: {
    accountNumbers: Array<PhoneNumber>,
  };

  render() {
    return (
      <View>
        <Text>
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
