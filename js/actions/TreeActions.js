import TreeDispatcher from '../dispatcher/Dispatcher';
import TreePersistence from '../persistence/TreePersistence';

let initialLoad = true; // XX right place?
let initialLoadDedup = {};

export default {
  loadPath(path, data) {
    return TreeDispatcher.handleServerAction({
      path,
      data,
      type: 'loadPath',
    });
  },

  loadSein(path, data) {
    return TreeDispatcher.handleServerAction({
      path,
      data,
      type: 'loadSein',
    });
  },

  clearData() {
    initialLoad = false;
    initialLoadDedup = {};
    TreePersistence.refresh(); // XX right place?
    return TreeDispatcher.handleServerAction({
      type: 'clearData',
    });
  },

  sendQuery(path, query) {
    if (query == null) {
      return;
    }
    if (initialLoad) {
      const key = path + (JSON.stringify(query));
      if (!initialLoadDedup[key]) {
        initialLoadDedup[key] = true;
        console.warn('Requesting data during initial page load', (JSON.stringify(path)), query);
      }
    }
    if (path.slice(-1) === '/') { path = path.slice(0, -1); }
    TreePersistence.get(path, query, (err, res) => {
      if (err != null) { throw err; }
      return this.loadPath(path, res);
    });
  },

  registerComponent(name, comp) {
    return this.addVirtual({
      [name]: comp,
    });
  },
  registerScriptElement(elem) {
    return TreePersistence.waspElem(elem);
  },

  addVirtual(components) {
    return TreeDispatcher.handleViewAction({
      type: 'addVirtual',
      components
    });
  },

  addComment(pax, sup, txt) {
    return TreePersistence.put({
      pax,
      sup,
      txt,
    }, 'talk-comment', 'talk', (err) => {
      if (err == null) {
        return this.clearData();
      } return null;
    });
  },

  addPost(pax, sup, hed, txt) {
    return TreePersistence.put({
      pax,
      sup,
      hed,
      txt,
    }, 'talk-fora-post', 'talk', (err) => {
      if (err == null) {
        this.clearData();
        history.pushState({}, '', '..');
        return this.setCurr(pax);
      } return null;
    });
  },

  setPlanInfo({
    who,
    loc,
  }) {
    return TreePersistence.put({
      who,
      loc,
    }, 'write-plan-info', 'hood');
  },

  setCurr(path, init) {
    if (init == null) {
      init = false;
    }
    initialLoad = initialLoad && init;
    return TreeDispatcher.handleViewAction({
      type: 'setCurr',
      path,
    });
  },

  setNav({
    title,
    dpad,
    sibs,
    subnav,
  }) {
    return TreeDispatcher.handleViewAction({
      title,
      dpad,
      sibs,
      subnav,
      type: 'setNav',
    });
  },

  toggleNav() {
    return TreeDispatcher.handleViewAction({
      type: 'toggleNav',
    });
  },
  closeNav() {
    return TreeDispatcher.handleViewAction({
      type: 'closeNav',
    });
  },

  clearNav() {
    return TreeDispatcher.handleViewAction({
      type: 'clearNav',
    });
  },
};
