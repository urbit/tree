import MessageDispatcher from '../dispatcher/Dispatcher';

const { EventEmitter } = require('events').EventEmitter;

let _virt = {};
let _tree = {};
let _data = {};
let _curr = '';
let _nav = {};

const QUERIES = {
  body: 'r',
  head: 'r',
  snip: 'r',
  sect: 'j',
  meta: 'j',
  comt: 'j',
  plan: 'j',
  beak: 't',
  spur: 't',
  bump: 't'
};

const TreeStore = _.extend((new EventEmitter).setMaxListeners(50), {
  addChangeListener(cb) {
    return this.on('change', cb);
  },

  removeChangeListener(cb) {
    return this.removeListener('change', cb);
  },

  emitChange() {
    return this.emit('change');
  },

  pathToArr(_path) {
    return _path.split('/');
  },

  fulfill(path, query) {
    if (path === '/') {
      path = '';
    }
    return this.fulfillAt((this.getTree(path.split('/'))), path, query);
  },

  fulfillAt(tree, path, query) {
    const data = this.fulfillLocal(path, query);
    const have = _data[path];
    if (have != null) {
      if (query) {
        Object.keys(query).forEach((k) => {
          const t = query[k];
          if (QUERIES[k]) {
            if (t !== QUERIES[k]) {
              throw TypeError(`Wrong query type: ${k}, '${t}'`);
            }
            data[k] = have[k];
          }
        });
      }
    }
    if (query.kids) {
      if (__guard__(have, x => x.kids) === false) {
        data.kids = {};
      } else {
        Object.keys(tree).forEach((k) => {
          const sub = tree[k];
          if (data.kids == null) {
            data.kids = {};
          }
          data.kids[k] = this.fulfillAt(sub, `${path}/${k}`, query.kids);
        });
      }
    }
    if (!_.isEmpty(data)) {
      return data;
    }
  },

  fulfillLocal(path, query) {
    const data = {};
    if (query.path) {
      data.path = path;
    }
    if (query.name) {
      data.name = path.split('/').pop();
    }
    if (query.sein) {
      data.sein = this.getPare(path);
    }
    if (query.next) {
      data.next = this.getNext(path);
    }
    if (query.prev) {
      data.prev = this.getPrev(path);
    }
    return data;
  },

  setCurr({ path }) {
    _curr = path;
  },

  getCurr() {
    return _curr;
  },

  addVirtual({
    components,
  }) {
    return _.extend(_virt, components);
  },
  getVirtualComponents() {
    return _virt;
  },

  clearData() {
    _data = {};
    _tree = {};
  },

  loadSein({ path, data }) {
    const sein = this.getPare(path);
    if (sein != null) {
      return this.loadPath({
        path: sein,
        data,
      });
    } return null;
  },

  loadPath({
    path,
    data,
  }) {
    return this.loadValues((this.getTree((path.split('/')), true)), path, data);
  },

  loadValues(tree, path, data) {
    let old = _data[path] != null ? _data[path] : {};
    Object.keys(data).forEach((k) => {
      if (QUERIES[k]) {
        old[k] = data[k];
      }
    });

    if (data.kids) {
      Object.keys(data.kids).forEach((k) => {
        const v = data.kids[k];
        if (tree[k] == null) {
          tree[k] = {};
        }
        let _path = path;
        if (_path === '/') {
          _path = '';
        }
        this.loadValues(tree[k], `${_path}/${k}`, v);
      });
    }

    if (data.kids && _.isEmpty(data.kids)) {
      old.kids = false;
    }

    _data[path] = old;
  },

  getSiblings(path) {
    if (path == null) {
      path = _curr;
    }
    const curr = path.split('/');
    curr.pop();
    if (curr.length !== 0) {
      return this.getTree(curr);
    } return {};
  },

  getTree(_path, make) {
    if (make == null) {
      make = false;
    }
    let tree = _tree;
    Array.from(_path).forEach((sub) => {
      if (!sub) {
        return;
      } // discard empty path elements
      if (tree[sub] == null) {
        if (!make) {
          return;
        }
        tree[sub] = {};
      }
      tree = tree[sub];
    });
    return tree;
  },

  getPrev(path) {
    if (path == null) {
      path = _curr;
    }
    const sibs = _.keys(this.getSiblings(path)).sort();
    if (sibs.length < 2) {
      return null;
    }
    const par = path.split('/');
    const key = par.pop();
    const ind = sibs.indexOf(key);
    const win = (ind - 1) >= 0 ? sibs[ind - 1] : sibs[sibs.length - 1];
    par.push(win);
    return par.join('/');
  },

  getNext(path) {
    if (path == null) {
      path = _curr;
    }
    const sibs = _.keys(this.getSiblings(path)).sort();
    if (sibs.length < 2) {
      return null;
    }
    const par = path.split('/');
    const key = par.pop();
    const ind = sibs.indexOf(key);
    const win = (ind + 1) < sibs.length ? sibs[ind + 1] : sibs[0];
    par.push(win);
    return par.join('/');
  },

  getPare(path) {
    if (path == null) {
      path = _curr;
    }
    let _path = this.pathToArr(path);
    if (_path.length > 1) {
      _path.pop();
      _path = _path.join('/');
      if (_path === '') {
        _path = '/';
      }
      return _path;
    } return null;
  },

  setNav({
    title,
    dpad,
    sibs,
    subnav,
  }) {
    const nav = {
      title,
      dpad,
      sibs,
      subnav,
      open: (_nav.open ? _nav.open : false),
    };
    _nav = nav;
  },
  getNav() { return _nav; },

  toggleNav() { _nav.open = !_nav.open; },

  closeNav() { _nav.open = false; },

  clearNav() {
    _nav = {
      title: null,
      dpad: null,
      sibs: null,
      subnav: null,
      open: false,
    };
  },
});

TreeStore.dispatchToken = MessageDispatcher.register((p) => {
  const a = p.action;

  if (TreeStore[a.type]) {
    TreeStore[a.type](a);
    return TreeStore.emitChange();
  } return null;
});

export default TreeStore;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
