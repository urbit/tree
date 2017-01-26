import util from '../utils/util';

let dedup = {}; // XX wrong layer

const pending = {};
let waitingDepends = [];

export default {
  refresh() {
    dedup = {};
  },

  get(path, query, cb) {
    if (query == null) { query = 'no-query'; }
    const url = `/_tree-json${util.basepath(path)}?${this.encode(query)}`;
    if (dedup[url]) { return; }
    dedup[url] = true;
    pending[url] = true;
    $.get(url, {}, (data, status, xhr) => { // XX on error
      delete pending[url];
      const dep = urb.readDependencyHeader(xhr);
      waitingDepends.push(dep);
      if (_.isEmpty(pending)) {
        waitingDepends.map((dep)=> urb.addDependency(dep,"data"));
        waitingDepends = [];
      }
      if (cb) {
        return cb(null, data);
      } return null;
    });
  },

  put(data, mark, app, cb) {
    if (app == null) {
      app = /[a-z]*/.exec(mark)[0];
    }
    return urb.init(() => urb.send(data, {
      mark,
      app,
    }, cb));
  },

  addDependencyElem(a) {urb.addDependencyElem(a)},

  encode(_list) {
    let list;
    if(_list instanceof Array){
      list = _list
    }
    else {
      // convert {spur:'t', {kids:{plan:'t', snip:'r'}}} old format
      //  to ['spur' {kids:['plan' 'snip']}] new format
      list = [];
      for (let k in _list) { 
        let v = _list[k];
        if (_.isString(v)) {
          list.push(k);
        } else {
          let kids = [];
          for (let k2 in v) {
            let v2 = v[k2];
            kids.push(k2);
          }
          list.push({[k]: kids})
        }
      }
    }
          
    return list.map( (elem) => {
      if (_.isString(elem)) {
        return elem;
      } else {
        for (let key in elem) {
          let v = elem[key];
          return key+"="+elem[key].join('+');
        }
      }
    }).join('&');
  },
};
