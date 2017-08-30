// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';

import { ActionCreators } from '../actions';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    zIndex: 2,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    width: screenWidth,
    marginRight: -40,
  },
  icon: {
    height: 50,
    paddingTop: 10,
    paddingRight: 15,
  },
});

type PropsT = {
  sendMessage: (string, string, string) => void,
  to: string,
  from: string,
}

export class PWriteBox extends Component {
  props: PropsT;

  state: {
    text: string,
  }

  constructor(props: PropsT) {
    super(props);
    this.state = { text: '' };

    this.send = this.send.bind(this);
  }

  send() {
    this.props.sendMessage(this.props.to, this.props.from, this.state.text);
    this.setState({ text: '' });
  }

  renderInput() {
    return (
      <TextInput
        style={styles.input}
        returnKeyType={'send'}
        onChangeText={text => this.setState({ text })}
        placeholder={'Type an SMS message'}
        onSubmitEditing={() => { this.send(); }}
        value={this.state.text}
      />
    );
  }

  renderButton() {
    return (
      <Icon
        style={styles.icon}
        name='send'
        color='#aaa'
        underlayColor='#00000000'
        raised={true}
        onPress={() => { this.send(); }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderInput()}
        {this.renderButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PWriteBox);
