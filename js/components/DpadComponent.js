import util from '../utils/util';

let recl = React.createClass;
let {div,a} = React.DOM;

function Arrow(name, path) {
  const href = util.basepath(path);
  return (<a href={href} key={name} className={name}></a>);
}

function Dpad({ sein, curr, kids, meta }) {
  const keys = util.getKeys(kids, meta.navsort);
  let next;
  let prev;
  let arrowUp;

  if (sein) {
    arrowUp = (<a href={util.basepath(sein)} key="up" className="up" />);
    if (meta.navuptwo) {
      const _path = sein.replace(/\/[^\/]*$/, "")
      arrowUp = (<a
        href={util.basepath(_path)}
        key="up"
        className="up"
      />);
    }
  }

  if (keys.length > 1) {
    const index = keys.indexOf(curr);
    prev = index - 1;
    next = index + 1;
    if (prev < 0) { prev = keys.length - 1; }
    if (next === keys.length) { next = 0; }
    prev = keys[prev];
    next = keys[next];
  }

  if (sein) { if (sein === '/') { sein = ''; } }

  return (<div className="dpad" key="dpad">
    {arrowUp}
    { (sein && prev) &&
      <a
        href={util.basepath(`${sein}/${prev}`)}
        key="prev"
        className="prev"
      /> }
    { (sein && next) &&
      <a
        href={util.basepath(`${sein}/${next}`)}
        key="next"
        className="next"
      /> }
  </div>);
}

Dpad.propTypes = {
  sein: React.PropTypes.string,
  curr: React.PropTypes.string,
  kids: React.PropTypes.object,
  meta: React.PropTypes.object,
};

export default Dpad;
