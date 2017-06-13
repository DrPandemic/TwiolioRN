// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ActionCreators } from '../actions';
import { colors } from '../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: colors.primary.text,
    fontSize: 20,
    marginLeft: 10,
  },
  icon: {
  }
});

export class PConversationMenu extends Component {
  props: {
    goBack: () => void,
    location: { state: any }
  }

  renderButton() {
    return (
      <Icon
        name='keyboard-backspace'
        size={25}
        color={colors.primary.text}
        style={styles.icon}
        onPress={this.props.goBack}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderButton()}
        <Text
          style={styles.text}>
          {this.props.location.state}
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

export default connect(mapStateToProps, mapDispatchToProps)(PConversationMenu);
