// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default class Row {
  render() {
    alert(JSON.stringify(this.props));
    return (
      <View style={styles.container}>
        <Icon name='face' style={styles.icon} />
        <Text style={styles.text}>
          {this.props[0]}
        </Text>
      </View>
    );
  }
}
