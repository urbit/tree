import util from '../utils/util.js';
let dedup = {};  // XX wrong layer

let pending = {};
let waspWait = [];

export default {
  refresh() { return dedup = {}; },
  get(path,query,cb) {
    if (query == null) { query = "no-query"; }
    let url = `${util.basepath(path)}.tree-json?q=${this.encode(query)}`;
    if (dedup[url]) { return; }
    dedup[url] = true;
    pending[url] = true;
    return $.get(url, {}, function(data,status,xhr) {  // XX on error
      delete pending[url];
      if (urb.wasp != null) {
        let dep = urb.getXHRWasp(xhr);
        urb.sources[dep] = url; // debugging info
        waspWait.push(dep);
        if (_.isEmpty(pending)) {
          waspWait.map(urb.waspData);
          waspWait = [];
        }
      }
      if (cb) { return cb(null,data); }
    });
  },
    
  put(data,mark,appl,cb){
    if (appl == null) { appl = /[a-z]*/.exec(mark)[0]; }
    return urb.init(() => urb.send(data, {mark,appl}, cb));
  },

  waspElem(a){
    if (urb.wasp != null) {
      return urb.waspElem(a);
    }
  },
    
  encode(obj){
    let delim = n=> Array(n+1).join('_') || '.';
    let _encode = function(obj){
      if (typeof obj !== 'object') {
        return [0,obj];
      }
      let dep = 0;
      let sub = (() => {
        let result = [];
        for (let k in obj) {
          let v = obj[k];
          let item;
          let [_dep,res] = _encode(v);
          if (_dep > dep) { dep = _dep; }
          if (res != null) { item = k+(delim(_dep))+res; }
          result.push(item);
        }
        return result;
      })();
      dep++;
      return [dep, sub.join(delim(dep))];
    };
    return (_encode(obj))[1];
  }
};
