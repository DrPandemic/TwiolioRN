import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';


class AppContainer extends Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.accountNumbers.join(' ')}
        </Text>
        <TouchableHighlight style={{marginTop:20}} onPress={this.props.fetchAccountNumbers}>
          <Text>
            asd
          </Text>
        </TouchableHighlight>
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
