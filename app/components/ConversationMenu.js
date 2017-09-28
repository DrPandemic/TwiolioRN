// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { PSimpleMenu } from './SimpleMenu';
import type { StateT } from '../reducers';

function mapStateToProps(props: StateT) {
  return {
    text: props.router.location.state.conversationId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PSimpleMenu);
