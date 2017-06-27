// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions';
import { RefreshInterval } from '../constants';

type PropsT = {
  fetchAccountNumbers: () => Promise<void>,
  fetchMessages: () => Promise<void>,
  persistStore: () => Promise<void>,
  restoreStore: () => Promise<void>,
  // Testing purposes
  tickDone?: () => {},
};

export class PInterval extends Component {
  props: PropsT;
  timeout: ?any;
  finished: boolean;

  constructor(props: PropsT): void {
    super(props);

    this.finished = true;

    this.tick = this.tick.bind(this);
    this.setTimeout = this.setTimeout.bind(this);
  }

  tick(): void {
    this.props.fetchMessages()
        .then(() => { this.setTimeout(); })
        .then(() => { if (this.props.tickDone) this.props.tickDone(); })
        .catch(e => { console.error(e); });
  }

  setTimeout(): void {
    if (!this.finished) {
      this.timeout = setTimeout(this.tick, RefreshInterval);
    }
  }

  componentDidMount(): void {
    this.finished = false;
    this.props.fetchAccountNumbers();
    this.props.restoreStore();
    /* this.tick();*/
  }

  componentWillUnmount(): void {
    this.finished = true;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    return (null);
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PInterval);
