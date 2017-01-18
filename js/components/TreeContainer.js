import { connect } from 'react-redux';
import { Component } from 'react';

import { sendQuery } from '../TreeActions';

import Spinner from './LoadComponent';

class TreeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(sendQuery({
      body: 'r',
      name: 't',
      path: 't',
      meta: 'j',
      sein: 't',
    }, this.getPath()));
  }
  fragsrc (src, basePath) {
    if (src != null) {
      basePath = util.basepath(basePath);
      if (basePath.slice(-1) !== '/') {
        basePath += '/';
      }
      const base = new URL(basePath, document.location);
      const { pathname } = new URL(src, base);
      return util.fragpath(pathname);
    } return null;
  }
  getPath() {
    let path = this.props.dataPath;
    const base = ''
    if (path == null) {
      const left = this.fragsrc(this.props.src, base)
      path = left != null ? left : base;
    }
    if (path.slice(-1) === '/') { return path.slice(0, -1); }
    return path;
  }
  render() {
    return (<Spinner />);
  }
}

let mapStateToProps = (state) => { return state; };

export default connect(mapStateToProps)(TreeContainer);
