import { connect } from 'react-redux';

import LoadComponent from './LoadComponent';

const rele = React.createElement;
const load = React.createFactory(LoadComponent);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

const name = (displayName, component) => _.extend(component, {
  displayName,
});

const walk = (root, _nil, _str, _comp) => {
  // manx: fork: ["string", {"$node":[{"$attrs"}, "...children"]}]
  const step = (elem, key) => {
    let left;
    switch (false) {
      case !(elem == null):
        return _nil();
      case typeof elem !== 'string':
        return _str(elem);
      case (_.keys(elem).length != 1): {
        const gn = _.keys(elem)[0]
        let [ga, ...c] = elem[gn]
        c = c.map(step)
        return _comp.call(elem, {
          gn,
          ga,
          c,
        }, key);
      }
      case !(React.isValidElement(elem)):
        return elem;
      default:
        throw new Error(`Bad react-json ${JSON.stringify(elem)}`);
    }
  };
  return step(root);
};

const Virtual = name('Virtual', ({ manx, components, basePath, dispatch }) =>
  walk(manx,
    () => load({}, ''),
    str => str,
    ({ gn, ga, c }, key) => { //    ([node,attrs,children...], key) => {
      const props = { key };  //      const props = _.extend({ key }, attrs);
      if (__guard__(ga, x => x.style)) {
        try {
          ga.style = eval(`(${ga.style})`);
        } catch (e) {
          ga.style = ga.style;
        }
      }
      if (components[gn]) {
        props.basePath = basePath;
        }
      return rele((components[gn] != null ? components[gn] : gn),
        (_.extend(props, ga)),
        c.length ? c : undefined);
    }),
);

function mapStateToProps(state) {
  return { components: state.components };
}
const DynamicVirtual = connect(mapStateToProps)(Virtual);

const reactify = (manx, key, param = {}) => {
  const { basePath, components } = param;
  let component = {};
  if (components != null) {
    component = rele(Virtual, {
      manx,
      key,
      basePath,
      components,
    });
  } else {
    component = rele(DynamicVirtual, {
      manx,
      key,
      basePath,
    });
  }
  return component;
};

export default _.extend(reactify, {
  walk,
  Virtual,
});
