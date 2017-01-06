let _basepath = window.urb.util.basepath("/");
_basepath +=
  (window.location.pathname.replace(window.tree._basepath, "")).split("/")[0];

export default {
  components: {
    ship: require('../components/ShipComponent.js')
  },

  basepath(path) {
    let prefix = _basepath;
    if (prefix === "/") { prefix = ""; }
    if (path[0] !== "/") { path = `/${path}`; }
    let _path = prefix + path;
    if ((_path.slice(-1) === "/") && (_path.length > 1)) {
      _path = _path.slice(0,-1);
    }
    return _path;
  },

  fragpath(path) {
    return path.replace(/\/$/,'')
        .replace(_basepath,"");
  },

  shortShip(ship){
    if (ship == null) { ship = urb.user != null ? urb.user : ""; }
    if (ship.length <= 13) {
      return ship;
    } else if (ship.length === 27) {
      return ship.slice(14, 20) + "^" + ship.slice(-6);
    } else {
      return ship.slice(0, 6) + "_" + ship.slice(-6); // s/(.{6}).*(.{6})/\1_\2/
    }
  },

  dateFromAtom(date){
    let d;
    let [yer,mon,day,__,hor,min,sec] = // ~y.m.d..h.m.s
      date.slice(1).split(".");
    if (day != null) {
      d = new Date();
      d.setYear(yer);
      d.setMonth(mon-1);
      d.setDate(day);
    }
    if (hor != null) {
      d.setHours(hor);
      d.setMinutes(min);
      return d.setSeconds(sec);
    }
  },

  getKeys(kids,sortBy) { return _.map((this.sortKids(kids,sortBy)), 'name'); },
  sortKids(kids,sortBy){ // kids: {name:'t', bump:'t', meta:'j'}
    let v;
    if (sortBy == null) { sortBy = null; }
    kids = _.filter(kids,({meta})=> !(__guard__(meta, x => x.hide)));
    switch (sortBy) {
      case 'bump':
        return _.sortBy(kids,
          ({bump,meta,name})=> this.dateFromAtom(bump || __guard__(meta, x => x.date) || name)
        ).reverse();
      //
      case 'date':
        let _kids = [];
        for (var k in kids) {
          v = kids[k];
          if (__guard__(v.meta, x => x.date) == null) { // XX throw?
            return _.sortBy(kids,'name');
          }
          let date = this.dateFromAtom(v.meta.date);
          if (date == null) { // XX throw
            return _.sortBy(kids,'name');
          }
          let _k = Number(new Date(date));
          _kids[_k] = v;
        }
        return (() => {
          let result = [];
          for (k of Array.from(_.keys(_kids).sort().reverse())) {
            result.push(_kids[k]);
          }
          return result;
        })();
      //
      case null:
        _kids = [];
        for (k in kids) {
          v = kids[k];
          if (__guard__(v.meta, x1 => x1.sort) == null) { // XX throw if inconsistent?
            return _.sortBy(kids,'name');
          }
          _kids[Number(v.meta.sort)] = v;
        }
        return (() => {
          let result1 = [];
          for (k of Array.from(_.keys(_kids).sort())) {
            result1.push(_kids[k]);
          }
          return result1;
        })();
      //
      default: throw new Error(`Unknown sort: ${sortBy}`);
    }
  }
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}