import util from '../utils/util.js';
import _load from './LoadComponent.js';

import TreeStore from '../stores/TreeStore.js';
import TreeActions from '../actions/TreeActions.js';

let recl = React.createClass;
let {div,span,code} = React.DOM;

let fragsrc = function(src, basePath){
  if (src != null) {
    basePath = util.basepath(basePath);
    if (basePath.slice(-1) !== "/") {  basePath += "/"; }
    let base = new URL(basePath, document.location);
    let {pathname} = new URL(src, base);
    return util.fragpath(pathname);
  }
};

export default function(queries, Child, load){ if (load == null) { load = _load; } return recl({
  displayName: "Async",

  getInitialState() { return this.stateFromStore(); },
  _onChangeStore() {
    if (this.isMounted()) { return this.setState(this.stateFromStore()); }
  },

  getPath() {
    let path = this.props.dataPath;
    let base = this.props.basePath != null ? this.props.basePath : TreeStore.getCurr();
    if (path == null) { let left;
    path = ((left = fragsrc(this.props.src, base))) != null ? left : base; }
    if (path.slice(-1) === "/") {
      return path.slice(0,-1);
    } else { return path; }
  },

  stateFromStore() {
    let got;
    let path = this.getPath();
    let fresh = TreeStore.fulfill(path, queries);
    if ((this.state == null) || (path !== this.state.path)) {
      got = fresh;
    } else {
      got = this.mergeWith(this.state.got, fresh);
    }
    return {path,fresh,got, queries};
  },

  mergeWith(have,fresh,_queries){
    if (have == null) { have = {}; }
    if (fresh == null) { fresh = {}; }
    if (_queries == null) { _queries = queries; }
    let got = {};
    for (var k in _queries) {
      if (k !== 'kids') {
        got[k] = fresh[k] != null ? fresh[k] : have[k];
      }
    }
    if (_queries.kids != null) {
      if (fresh.kids == null) {
        got.kids = have.kids;
      } else {
        got.kids = {};
        for (k in fresh.kids) {
          let kid = fresh.kids[k];
          got.kids[k] =
            this.mergeWith(__guard__(have.kids, x => x[k]), kid, _queries.kids);
        }
      }
    }
    return got;
  },

  componentDidMount() {
    TreeStore.addChangeListener(this._onChangeStore);
    return this.checkPath();
  },

  componentWillUnmount() {
    return TreeStore.removeChangeListener(this._onChangeStore);
  },

  componentDidUpdate(_props,_state) {
    if (_props !== this.props) {
      this.setState(this.stateFromStore());
    }
    return this.checkPath();
  },

  checkPath() { return TreeActions.sendQuery(this.getPath(), this.filterFreshQueries()); },

  filterFreshQueries() { return this.filterWith(this.state.fresh, queries); },
  filterQueries() { return this.filterWith(this.state.got, queries); },
  filterWith(have,_queries){
    if (have == null) { return _queries; }
    let request = {};
    for (var k in _queries) {
      if (k !== 'kids') {
        if (have[k] === undefined) { request[k] = _queries[k]; }
      }
    }
    if (_queries.kids != null) {
      if (have.kids == null) {
        request.kids = _queries.kids;
      } else {
        request.kids = {};
        for (k in have.kids) {
          let kid = have.kids[k];
          _.merge(request.kids, this.filterWith(kid, _queries.kids));
        }
        if (_.isEmpty(request.kids)) {
          delete request.kids;
        }
      }
    }
    if (!_.isEmpty(request)) { return request; }
  },

  scrollHash() { return __guard__(this.getHashElement(), x => x.scrollIntoView()); },
  getHashElement() {
    let {hash} = document.location;
    if (hash) { return document.getElementById(hash.slice(1)); }
  },

  render() { return div({},
    (() => {
    if (this.filterQueries() != null) {
      return React.createElement(load, this.props);
    } else {
      if (!this.getHashElement()) {        // onmount?
        setTimeout(this.scrollHash,0);
      }
      return React.createElement(Child,
        (_.extend({}, this.props, this.state.got)),
        this.props.children);
    }
  })()
  ); }
}); };

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}