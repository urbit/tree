import TreePersistence from './persistence/TreePersistence';

export const SET_PATH = 'SET_PATH';
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const CLOSE_NAV = 'CLOSE_NAV';
export const SET_NAV = 'SET_NAV';
export const LOAD_PATH = 'LOAD_PATH';
export const ADD_COMPONENTS = 'ADD_COMPONENT';

export function addComponents(components) {
  return {
    type: ADD_COMPONENTS,
    components,
  };
}

export function toggleNav() {
  return { type: TOGGLE_NAV };
}

export function closeNav() {
  return { type: CLOSE_NAV };
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
  return (dispatch) => {
    if (query == null) { return null; }
    if (path.slice(-1) === '/') { path = path.slice(0, -1); }
    return TreePersistence.get(path, query, (err, res) => {
      if (err != null) { throw err; }
      dispatch(loadPath(path, res));
    });
  };
}

export function addComment(path, spur, value) {
  return (dispatch) => {
    return TreePersistence.put({
      pax: path,
      sup: spur,
      txt: value,
    }, 'talk-comment', 'talk', (err) => {
      if (err == null) {
        dispatch(clearData());
      }
    });
  };
}

export function addPost(path, spur, title, value) {
  return (dispatch) => {
    return TreePersistence.put({
      pax: path,
      sup: spur,
      hed: title,
      txt: value,
    }, 'talk-fora-post', 'talk', (err) => {
      if (err == null) {
        dispatch(clearData());
        history.pushState({}, '', '..');
        dispatch(setCurrentPath(path));
      }
    });
  };
}
