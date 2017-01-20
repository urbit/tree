import util from '../utils/util';

import { QUERIES } from '../TreeReducer'

export default (query) => {
  return (state, props) => {
    function pathFromRelative(src, basePath) {
      let path = util.basepath(basePath);
      if (path.slice(-1) !== '/') { path += '/'; }
      const base = new URL(path, document.location);
      const { pathname } = new URL(src, base);
      return util.fragpath(pathname);
    }

    function getPath() {
      let path = props.dataPath;
      const base = props.basePath != null ? props.basePath : state.path;
      if (path == null) {
        if (props.src == null) {
          path = base;
        } else {
          path = pathFromRelative(props.src, base);
        }
      }
      if (path.slice(-1) === '/') { return path.slice(0, -1); }
      return path;
    }

    // either create an object from a path
    // or get the value in _tree at a particular path
    // /a/b/c, true -> _tree += a:b:c:{}; return {};
    // /a/b/c -> return {};
    function getTree(_path) {
      let tree = state.tree;
      const parts = Array.from(_path);
      for (let i = 0; i < parts.length; i += 1) {
        const sub = parts[i];
        if (sub && tree[sub] != null) {  // ignore empty elements
          tree = tree[sub];
        }
      }
      return tree;
    }

    function getSiblings(path = state.path) {
      const curr = path.split('/');
      curr.pop();
      if (curr.length !== 0) {
        return this.getTree(curr);
      } return {};
    }

    function getPrev(path = state.path) {
      const sibs = _.keys(getSiblings(path)).sort();
      if (sibs.length < 2) { return null; }
      const par = path.split('/');
      const key = par.pop();
      const ind = sibs.indexOf(key);
      const win = (ind - 1) >= 0 ? sibs[ind - 1] : sibs[sibs.length - 1];
      par.push(win);
      return par.join('/');
    }

    function getNext(path = state.path) {
      const sibs = _.keys(getSiblings(path)).sort();
      if (sibs.length < 2) { return null; }
      const par = path.split('/');
      const key = par.pop();
      const ind = sibs.indexOf(key);
      const win = (ind + 1) < sibs.length ? sibs[ind + 1] : sibs[0];
      par.push(win);
      return par.join('/');
    }

    function getPare(path = state.path) {
      let _path = path.split('/');
      if (_path.length > 1) {
        _path.pop();
        _path = _path.join('/');
        if (_path === '') {
          _path = '/';
        }
        return _path;
      } return null;
    }

    function fulfillLocal(path, _query) {
      const data = {};
      if (_query.path) {
        data.path = path;
      }
      if (_query.name) {
        data.name = path.split('/').pop();
      }
      if (_query.sein) {
        data.sein = getPare(path);
      }
      if (_query.next) {
        data.next = getNext(path);
      }
      if (_query.prev) {
        data.prev = getPrev(path);
      }
      return data;
    }

    function fulfillAt(tree, path, _query) {
      const data = fulfillLocal(path, _query);
      const have = state.data[path];
      if (have != null) {
        if (_query) {
          Object.keys(_query).forEach((k) => {
            const t = _query[k];
            if (QUERIES[k]) {
              if (t !== QUERIES[k]) {
                throw TypeError(`Wrong _query type: ${k}, '${t}'`);
              }
              data[k] = have[k];
            }
          });
        }
      }
      if (_query.kids) {
        if (__guard__(have, x => x.kids) === false) {
          data.kids = {};
        } else {
          Object.keys(tree).forEach((k) => {
            const sub = tree[k];
            if (data.kids == null) { data.kids = {}; }
            data.kids[k] = fulfillAt(sub, `${path}/${k}`, _query.kids);
          });
        }
      }
      if (!_.isEmpty(data)) { return data; }
    }

    function fulfill(path, _query) {
      if (path === '/') { path = ''; }
      return fulfillAt((getTree(path.split('/'))), path, _query);
    }

    // have is the current state of the store for the current query
    // _query is a queryobject
    // this produces a pared down queryobject that needs to be fetched
    function filterWith(have, _query) {
      if (have == null) { return _query; }
      const request = {};
      Object.keys(_query).forEach((k) => {
        if (k !== 'kids') {
          if (have[k] === undefined) {
            request[k] = _query[k];
          }
        }
      });
      if (_query.kids != null) {
        if (have.kids == null) {
          request.kids = _query.kids;
        } else {
          request.kids = {};
          Object.keys(have.kids).forEach((k) => {
            const kid = have.kids[k];
            _.merge(request.kids, filterWith(kid, _query.kids));
          });
          if (_.isEmpty(request.kids)) {
            delete request.kids;
          }
        }
      }
      if (!_.isEmpty(request)) { return request; }
      return null;
    }

    const childPath = getPath();
    const childData = fulfill(childPath, query);
    const childQuery = filterWith(childData, query);

    const childProps = {
      data: childData,
      path: childPath,
      query: childQuery,
    };
    return childProps;
  };
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
