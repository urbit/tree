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
  return {
    type: 'loadPath',
    path,
    data,
  };
}

export function sendQuery(path, query) {
  if (query == null) { return null; }
  // if (initialLoad) {
  //   const key = path + (JSON.stringify(query));
  //   if (!initialLoadDedup[key]) {
  //     initialLoadDedup[key] = true;
  //     console.warn('Requesting data during initial page load', (JSON.stringify(path)), query);
  //   }
  // }
  if (path.slice(-1) === '/') { path = path.slice(0, -1); }
  return function disp(dispatch) {
    return TreePersistence.get(path, query, (err, res) => {
      if (err != null) { throw err; }
      dispatch(loadPath(path, res));
    });
  };
  //
  // TreePersistence.get(path, query, (err, res) => {
  //   if (err != null) { throw err; }
  //   return this.loadPath(path, res);
  // });
}
