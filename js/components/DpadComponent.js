let Dpad;
import util from '../utils/util.js';

let recl = React.createClass;
let {div,a} = React.DOM;

let Arrow = function(name,path){
  let href = util.basepath(path);
  return (a({href,key:`${name}`,className:`${name}`},""));
};

export default Dpad = function({sein,curr,kids,meta}){
  let keys, next, prev;
  let arrowUp =
    sein ?
      meta.navuptwo ?
        Arrow("up", sein.replace(/\/[^\/]*$/, "")) // strip last path element
      :
        Arrow("up", sein) : undefined;

  let arrowSibs = (
    keys = util.getKeys(kids, meta.navsort),
    (() => {
      if (keys.length > 1) {
      let index = keys.indexOf(curr);
      prev = index-1;
      next = index+1;
      if (prev < 0) { prev = keys.length-1; }
      if (next === keys.length) { next = 0; }
      prev = keys[prev];
      return next = keys[next];
    }
    })(),
    (() => {
      if (sein) {
      let _arrow;
      if (sein === "/") { sein = ""; }
      if (prev) {
        _arrow = Arrow("prev", `${sein}/${prev}`);
      }
      if (next) {
        _arrow = Arrow("next", `${sein}/${next}`);
      }
      return div({}, _arrow);
    }
    })()
  );

  return (div({className:'dpad',key:'dpad'}, arrowUp, arrowSibs));
};
