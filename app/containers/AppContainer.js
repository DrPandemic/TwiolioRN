import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
  View,
  Text,
} from 'react-native';


class AppContainer extends Component {
  render() {
    return (
      <View>
        <Text style={{marginTop:20}}>
          asdf
        </Text>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {};}, mapDispatchToProps)(AppContainer);
