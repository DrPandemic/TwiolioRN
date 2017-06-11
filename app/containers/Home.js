// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
} from 'react-native';

import { ActionCreators } from '../actions';

class AppContainer extends Component {
  props: {};

  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <Text onPress={Actions.conversation}>
          asd
        </Text>
      </View>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
