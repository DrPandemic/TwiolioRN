// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scene, Router } from 'react-native-router-flux';

import { ActionCreators } from '../actions';
import Home from './Home';
import Conversation from './Conversation';
import PhoneNumberMenu from '../components/PhoneNumberMenu';
import ConversationList from '../components/ConversationList';

class AppContainer extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="home"
            component={ConversationList}
            initial={true}
            renderLeftButton={() => <PhoneNumberMenu/>}
          />
          <Scene key="conversation" component={Conversation}/>
        </Scene>
      </Router>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
