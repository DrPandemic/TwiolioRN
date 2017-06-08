// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default class Row extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.entry[0]}
        </Text>
      </View>
    );
  }
}
