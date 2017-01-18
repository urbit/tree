import TreePersistence from './persistence/TreePersistence';

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
  console.log('load')
  return {
    type: 'loadPath',
    path,
    data,
  };
}

export function anError(path) {
  console.log(path)
}

function goGet(path) {
  console.log(path)
  return fetch('http://google.com')
}

export function sendQuery(path, query) {
  // if (query == null) { return null; }
  if (path.slice(-1) === '/') { path = path.slice(0, -1); }
  // return function (dispatch) {
  //   return setTimeout(() => {
  //     dispatch(loadPath('/some/path', {}));
  //   }, 1000);
  // };
  return function (dispatch) {
    return TreePersistence.get(path, query, (err, res) => {
      if (err != null) { throw err; }
      dispatch(loadPath(path, res));
    });
  };
}
