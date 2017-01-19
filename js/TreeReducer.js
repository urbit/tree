import { combineReducers } from 'redux';

import { SET_PATH, LOAD_PATH } from './TreeActions';

export const QUERIES = {
  body: 'r', // reactJSON
  head: 'r',
  snip: 'r',
  sect: 'j', // jsonOfSomeSort
  meta: 'j',
  comt: 'j',
  plan: 'j',
  beak: 't', // text
  spur: 't',
  bump: 't',
};

function path(state = '', action) {
  switch (action.type) {
    case SET_PATH:
      return action.path;
    default:
      return state;
  }
}

function tree(state = {}, action) {
  switch (action.type) {
    case LOAD_PATH:
      function loadValuesTree(_tree, _data) {
        if (_data.kids) {
          Object.keys(_data.kids).forEach((k) => {
            const v = _data.kids[k];
            if (_tree[k] == null) {
              _tree[k] = {};
            }
            loadValuesTree(_tree[k], v);
          });
        }
        return _tree;
      }
      return Object.asssign({}, loadValuesTree(state, action.data))
    default:
      return state;
  }
}

function data(state = {}, action) {
  switch (action.type) {
    case LOAD_PATH:
      function loadValues(_state, _path, _data) {
        let old = _state[path] != null ? _state[path] : {};
        Object.keys(_data).forEach((k) => {
          if (QUERIES[k]) {
            old[k] = _data[k];
          }
        });

        if (_data.kids) {
          Object.keys(_data.kids).forEach((k) => {
            const v = _data.kids[k];
            let __path = _path;
            if (__path === '/') {
              __path = '';
            }
            this.loadValues(`${__path}/${k}`, v);
          });
        }

        if (_data.kids && _.isEmpty(_data.kids)) {
          old.kids = false;
        }

        _state[path] = old;
      }
      return loadValues(Object.assign({}, state), action.path, action.data);
    default:
      return state;
  }
}

const mainReducer = combineReducers({
  path,
  data,
  tree,
});

export default mainReducer;
