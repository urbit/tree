import { connect } from 'react-redux';
import { Component } from 'react';

import { sendQuery } from '../TreeActions';

import Spinner from './LoadComponent';

class TreeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(sendQuery(this.props.query));
  }
  render() {
    return (<Spinner />);
  }
}

let mapStateToProps = (state) => { return state; };

export default connect(mapStateToProps)(TreeContainer);
