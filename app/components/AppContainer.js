// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, withRouter } from 'react-router-native';

import { ActionCreators } from '../actions';
import Conversation from './Conversation';
import PhoneNumberMenu from './PhoneNumberMenu';
import ConversationMenu from './ConversationMenu';
import ConversationList from './ConversationList';
import { colors } from '../constants';

const styles = StyleSheet.create({
  container: {
  },
  nav: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.primary.normal,
    elevation: 5,
  },
});

class AppContainer extends Component {
  props: {
    fetchAccountNumbers: () => Promise<void>,
    fetchMessages: () => Promise<void>,
  };

  componentDidMount(): void {
    this.props.fetchAccountNumbers();
    this.props.fetchMessages();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Route exact path="/" component={PhoneNumberMenu}/>
          <Route path="/conversation" component={ConversationMenu}/>
        </View>

        <Route exact path="/" component={ConversationList}/>
        <Route path="/conversation" component={Conversation}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
