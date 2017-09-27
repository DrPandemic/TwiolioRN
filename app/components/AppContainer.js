// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { AndroidBackButton, Route, withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import Conversation from './Conversation';
import PhoneNumberMenu from './PhoneNumberMenu';
import ConversationMenu from './ConversationMenu';
import ConversationList from './ConversationList';
import { Colors } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  nav: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.primary.normal,
    elevation: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  }
});

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

class AppContainer extends Component {
  props: {
    restoreStore: () => Promise<void>,
  }

  componentDidMount(): void {
    console.disableYellowBox = true;
    this.props.restoreStore();
  }

  render() {
    return (
      <View style={styles.container}>
        <AndroidBackButton />

        <View style={styles.nav}>
          <Route exact path="/" component={PhoneNumberMenu}/>
          <Route path="/conversation" component={ConversationMenu}/>
        </View>

        <View style={styles.content}>
          <Route exact path="/" component={ConversationList}/>
          <Route path="/conversation" component={Conversation}/>
        </View>
      </View>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
