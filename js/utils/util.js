import Ship from '../components/ShipComponent';

let _basepath = '';

export default {
  init() {
    _basepath = window.urb.util.basepath('/');
    _basepath +=
      (window.location.pathname.replace(window.tree._basepath, '')).split('/')[0];
  },

  components: { ship: Ship },

  basepath(path) {
    let prefix = _basepath;
    if (prefix === '/') {
      prefix = '';
    }
    if (path[0] !== '/') {
      path = `/${path}`;
    }
    let _path = prefix + path;
    if ((_path.slice(-1) === '/') && (_path.length > 1)) {
      _path = _path.slice(0, -1);
    }
    return _path;
  },

  fragpath(path) {
    return path.replace(/\/$/, '').replace(_basepath, '');
  },

  shortShip(ship) {
    if (ship == null) {
      ship = urb.user != null ? urb.user : '';
    }
    if (ship.length <= 13) {
      return ship;
    } else if (ship.length === 27) {
      return `${ship.slice(14, 20)}^${ship.slice(-6)}`;
    }
    return `${ship.slice(0, 6)}_${ship.slice(-6)}`; // s/(.{6}).*(.{6})/\1_\2/
  },

  dateFromAtom(date) {
    let d;
    const [yer, mon, day, xx, hor, min, sec] = // ~y.m.d..h.m.s
    date.slice(1).split('.');
    if (day != null) {
      d = new Date();
      d.setYear(yer);
      d.setMonth(mon - 1);
      d.setDate(day);
    }
    if (hor != null) {
      d.setHours(hor);
      d.setMinutes(min);
      return d.setSeconds(sec);
    }
  },

  getKeys(kids, sortBy) {
    return _.map((this.sortKids(kids, sortBy)), 'name');
  },

  sortKids(kids, sortBy) { // kids: {name:'t', bump:'t', meta:'j'}
    let v;
    let f;
    let miss = false;
    if (sortBy == null) {
      sortBy = null;
    }
    kids = _.filter(kids,
      ({meta}) => !(__guard__(meta, x => x.hide)));

    switch (sortBy) {
      case 'bump': {
        return _.sortBy(kids,
          ({ bump, meta, name }) => {
            this.dateFromAtom(bump || __guard__(meta, x => x.date) || name)
          },
        ).reverse();
      }
      case 'date': {
        let _kids = [];
        Object.keys(kids).forEach((k) => {
          v = kids[k];
          if (__guard__(v.meta, x => x.date) == null) {
            miss = true;
          }
          const date = this.dateFromAtom(v.meta.date);
          if (date == null) { // XX throw
            miss = true;
          }
          const _k = Number(new Date(date));
          _kids[_k] = v;
        });

        if (miss === true) {
          console.warn(`Hit malformed metadata. Sort set to date, date missing. See: ${v.title}`)
          return _.sortBy(kids, 'name');
        }

        f = [];
        _.keys(_kids).sort().reverse().forEach((k) => {
          f.push(_kids[k]);
        })
        return f;
      }
      case null: {
        let _kids = [];
        Object.keys(kids).forEach((k) => {
          v = kids[k];
          if (__guard__(v.meta, x1 => x1.sort) == null) {
            miss = true
          }
          _kids[Number(v.meta.sort)] = v;
        });

        if (miss === true) {
          console.warn(`Hit malformed metadata. See: ${v.title}`)
          return _.sortBy(kids, 'name');
        }

        f = [];
        _.keys(_kids).sort().forEach((k) => {
          f.push(_kids[k]);
        })
        return f;
      }
      default:
        throw new Error(`Unknown sort: ${sortBy}`);
    }
  },
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
