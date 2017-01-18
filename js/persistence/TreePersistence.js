import util from '../utils/util';

let dedup = {}; // XX wrong layer

const pending = {};
let waspWait = [];

export default {
  refresh() {
    dedup = {};
  },

  get(path, query, cb) {
    if (query == null) { query = 'no-query'; }
    const url = `${util.basepath(path)}.tree-json?q=${this.encode(query)}`;
    if (dedup[url]) { return; }
    dedup[url] = true;
    pending[url] = true;
    $.get(url, {}, (data, status, xhr) => { // XX on error
      delete pending[url];
      if (urb.wasp != null) {
        const dep = urb.getXHRWasp(xhr);
        urb.sources[dep] = url; // debugging info
        waspWait.push(dep);
        if (_.isEmpty(pending)) {
          waspWait.map(urb.waspData);
          waspWait = [];
        }
      }
      if (cb) {
        return cb(null, data);
      } return null;
    });
  },

  put(data, mark, appl, cb) {
    if (appl == null) {
      appl = /[a-z]*/.exec(mark)[0];
    }
    return urb.init(() => urb.send(data, {
      mark,
      appl,
    }, cb));
  },

  waspElem(a) {
    if (urb.wasp != null) {
      return urb.waspElem(a);
    } return null;
  },

  encode(object) {
    const delim = n => Array(n + 1).join('_') || '.';
    function encoder(obj) {
      if (typeof obj !== 'object') {
        return [0, obj];
      }
      let dep = 0;
      const sub = (() => {
        const result = [];
        _.map(obj, (v, k) => {
          let item;
          const [_dep, res] = encoder(v);
          if (_dep > dep) {
            dep = _dep;
          }
          if (res != null) {
            item = k + (delim(_dep)) + res;
          }
          result.push(item);
        });
        return result;
      })();
      dep += 1;
      return [dep, sub.join(delim(dep))];
    }
    return (encoder(object))[1];
  },
};
