import { combineReducers } from 'redux';

import { SET_PATH,
        LOAD_PATH,
        ADD_COMPONENTS,
        TOGGLE_NAV,
        CLOSE_NAV,
        SET_NAV,
      } from './TreeActions';

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

const initialNavState = {
  title: '',
  dpad: true,
  sibs: null,
  subnav: null,
  open: false,
};

function nav(state = initialNavState, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return Object.assign({}, { open: !state.open }, state);
    case CLOSE_NAV:
      return Object.assign({}, { open: false }, state);
    case SET_NAV:
      return Object.assign({}, {
        title: action.title,
        dpad: action.dpad,
        sibs: action.sibs,
        subnav: action.subnav,
        open: action.open
      })
    default:
      return state;
  }
}

function tree(state = {}, action) {
  switch (action.type) {
    case LOAD_PATH: {
      let stateAtPath = state;
      Array.from(action.path.split('/')).forEach((sub) => {
        if (!sub) { return; } // discard empty path elements
        if (stateAtPath[sub] == null) {
          stateAtPath[sub] = {};
        }
        stateAtPath = stateAtPath[sub];
      });
      if (action.data.kids) {
        Object.keys(action.data.kids).forEach((k) => {
          // const v = action.data.kids[k];
          if (stateAtPath[k] == null) {
            stateAtPath[k] = {};
          }
        });
      }
      return Object.assign({}, state);
    }
    default:
      return state;
  }
}

function data(state = {}, action) {
  function loadValues(_state, _path, _data) {
    const old = _state[_path] != null ? _state[_path] : {};

    Object.keys(_data).forEach((k) => {
      if (QUERIES[k]) { old[k] = _data[k]; }
    });

    if (_data.kids) {
      Object.keys(_data.kids).forEach((k) => {
        const v = _data.kids[k];
        let __path = _path;
        if (__path === '/') { __path = ''; }
        loadValues(_state, `${__path}/${k}`, v);
      });
    }

    if (_data.kids && _.isEmpty(_data.kids)) { old.kids = false; }

    _state[_path] = old;

    return _state;
  }

  switch (action.type) {
    case LOAD_PATH:
      return loadValues(Object.assign({}, state), action.path, action.data);
    default:
      return state;
  }
}

function components(state = {}, action) {
  switch (action.type) {
    case ADD_COMPONENTS:
      _.extend(state, action.components);
      return state;
    default:
      return state;
  }
}

const mainReducer = combineReducers({
  path,
  data,
  tree,
  nav,
  components,
});

export default mainReducer;
