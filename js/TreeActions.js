import TreePersistence from './persistence/TreePersistence';

export const SET_PATH = 'SET_PATH';
export const LOAD_PATH = 'LOAD_PATH';
export const ADD_COMPONENTS = 'ADD_COMPONENT';

export function addComponents(components) {
  return {
    type: ADD_COMPONENTS,
    components,
  };
}

export function setCurrentPath(path, initialLoad = false) {
  return {
    type: SET_PATH,
    path,
    initialLoad,
  };
}

export function loadParent(path, data) {
  return {
    type: 'loadParent',
    path,
    data,
  };
}

export function clearData() {
  return {
    type: 'clearData',
    initialLoad: false,
    initialLoadDedup: {},
  };
}

export function loadPath(path, data) {
  return {
    type: LOAD_PATH,
    path,
    data,
  };
}

export function sendQuery(path, query) {
  return (dispatch,getState) => {
    if (query == null) { return null; }
    if (path.slice(-1) === '/') { path = path.slice(0, -1); }
    return TreePersistence.get(path, query, (err, res) => {
      if (err != null) { throw err; }
      dispatch(loadPath(path, res));
    });
  };
}
