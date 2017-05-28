// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
} from 'react-native';

import { ActionCreators } from '../actions';
import { PhoneNumber } from '../actions/types';

class AppContainer extends Component {
  props: {};

  render() {
    return (
      <View>
        <Text>
          something
        </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
