import { connect } from 'react-redux';
import { Component } from 'react';

import { sendQuery } from '../TreeActions';
import TreeContainerMap from '../stores/TreeContainerMap';

import Spinner from './LoadComponent';

function containerFactory(query, Child, Loading = Spinner) {
  class TreeContainer extends Component {
    componentWillMount() {
      this.props.dispatch(sendQuery(this.props.path, this.props.query));
    }

    render() {
      return (
        (this.props.query !== null) ?
          <Loading /> :
          <Child />
      );
    }
  }

  return connect(TreeContainerMap(query))(TreeContainer);
}

export default containerFactory;
