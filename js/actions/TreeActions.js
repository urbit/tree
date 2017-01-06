import TreeDispatcher from '../dispatcher/Dispatcher.js';
import TreePersistence from '../persistence/TreePersistence.js';

let _initialLoad = true; // XX right place?
let _initialLoadDedup = {};

export default {
  loadPath(path,data) {
    return TreeDispatcher.handleServerAction({path,data,type:"loadPath"});
  },

  loadSein(path,data) {
    return TreeDispatcher.handleServerAction({path,data,type:"loadSein"});
  },

  clearData() {
    _initialLoad = false;
    _initialLoadDedup = {};
    TreePersistence.refresh();  // XX right place?
    return TreeDispatcher.handleServerAction({type:"clearData"});
  },

  sendQuery(path,query) {
    if (query == null) { return; }
    if (_initialLoad) {
      let key = path+(JSON.stringify(query));
      if (!_initialLoadDedup[key]) {
        _initialLoadDedup[key] = true;
        console.warn("Requesting data during initial page load", (JSON.stringify(path)), query);
      }
    }
    if (path.slice(-1) === "/") { path = path.slice(0,-1); }
    return TreePersistence.get(path,query,(err,res) => {
      if (err != null) { throw err; }
      return this.loadPath(path,res);
    }
    );
  },

  registerComponent(name,comp) { return this.addVirtual({[name]: comp}); },
  registerScriptElement(elem){ return TreePersistence.waspElem(elem); },

  addVirtual(components) {
    return TreeDispatcher.handleViewAction({type:"addVirtual", components});
  },

  addComment(pax,sup,txt){
    return TreePersistence.put({pax,sup,txt}, "talk-comment", "talk", (err,res)=> {
      if (err == null) {
        return this.clearData();
      }
    }
    );
  },

  addPost(pax,sup,hed,txt){
    return TreePersistence.put({pax,sup,hed,txt}, "talk-fora-post", "talk", (err,res)=> {
      if (err == null) {
        this.clearData();
        history.pushState({},"","..");
        return this.setCurr(pax);
      }
    }
    );
  },

  setPlanInfo({who,loc}){
    return TreePersistence.put({who,loc}, "write-plan-info", "hood");
  },

  setCurr(path,init) {
    if (init == null) { init = false; }
    _initialLoad &= init;
    return TreeDispatcher.handleViewAction({
      type:"setCurr",
      path
    });
  },

  setNav({title,dpad,sibs,subnav}) {
    return TreeDispatcher.handleViewAction({
      title,
      dpad,
      sibs,
      subnav,
      type:"setNav"
    });
  },

  toggleNav() { return TreeDispatcher.handleViewAction({type:"toggleNav"}); },
  closeNav() { return TreeDispatcher.handleViewAction({type:"closeNav"}); },

  clearNav() {
    return TreeDispatcher.handleViewAction({type:"clearNav"});
  }
};
