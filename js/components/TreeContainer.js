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
      if (this.props.query !== null) {
        return (React.createFactory(Loading)({}, ''));
      }
      const childProps = Object.assign({}, this.props.data, this.props)
      return (React.createFactory(Child)(childProps, ''));
    }
  }

  return connect(TreeContainerMap(query))(TreeContainer);
}

export default containerFactory;
