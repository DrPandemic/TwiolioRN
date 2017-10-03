// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { AndroidBackButton, withRouter } from 'react-router-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropsRoute from './PropsRoute';
import { ActionCreators } from '../actions';
import Conversation from './Conversation';
import PhoneNumberMenu from './PhoneNumberMenu';
import ConversationMenu from './ConversationMenu';
import SimpleMenu from './SimpleMenu';
import ConversationList from './ConversationList';
import NewConversation from './NewConversation';
import NewConversationSource from './NewConversationSource';
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
          <PropsRoute exact path="/" component={PhoneNumberMenu}/>
          <PropsRoute path="/conversation" component={ConversationMenu}/>
          <PropsRoute path="/newConversation" component={SimpleMenu} text="Recipient"/>
          <PropsRoute path="/newConversationSource" component={SimpleMenu} text="Sender"/>
        </View>

        <View style={styles.content}>
          <PropsRoute exact path="/" component={ConversationList}/>
          <PropsRoute path="/conversation" component={Conversation}/>
          <PropsRoute path="/newConversation" component={NewConversation}/>
          <PropsRoute path="/newConversationSource" component={NewConversationSource}/>
        </View>
      </View>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
