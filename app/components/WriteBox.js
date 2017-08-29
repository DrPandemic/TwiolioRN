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
import type { StateT } from '../reducers';

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
  source: string,
  destination: string,
}

export class PWriteBox extends Component {
  props: PropsT;

  state: {
    text: string,
  }

  constructor(props: PropsT) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          returnKeyType={'send'}
          onChangeText={text => this.setState({ text })}
          placeholder={'Type an SMS message'}
        />
        <Icon
          style={styles.icon}
          name='send'
          color='#aaa'
          underlayColor='#ddd'
          raised={true}
          onPress={() => {alert();}}
        />
      </View>
    );
  }
}

function mapStateToProps(state: StateT) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PWriteBox);
