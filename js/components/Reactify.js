const recl = React.createClass;
const rele = React.createElement;
const { div, span } = React.DOM;
const load = React.createFactory(require('./LoadComponent.js'));

import TreeStore from '../stores/TreeStore.js';

let name = (displayName,component)=> _.extend(component, {displayName});

let walk = function(root,_nil,_str,_comp){
  // manx: {fork: ["string", {gn:"string" ga:{dict:"string"} c:{list:"manx"}}]}
  let _walk = function(elem,key){ let left;
  switch (false) {
    case !(elem == null): return _nil();
    case typeof elem !== "string": return _str(elem);
    case (elem.gn == null):
      let {gn,ga,c} = elem;
      c = ((left = __guard__(c, x => x.map(_walk)))) != null ? left : [];
      return _comp.call(elem, {gn,ga,c}, key);
    default: throw `Bad react-json ${JSON.stringify(elem)}`;
  } };
  return _walk(root);
};

let DynamicVirtual = recl({
  displayName: "DynamicVirtual",
  getInitialState() { return this.stateFromStore(); },

  stateFromStore() { return {components: TreeStore.getVirtualComponents()}; },

  _onChangeStore() {
    if (this.isMounted()) {
      return this.setState(this.stateFromStore());
    }
  },

  componentDidMount() {
    return TreeStore.addChangeListener(this._onChangeStore);
  },

  componentWillUnmount() {
    return TreeStore.removeChangeListener(this._onChangeStore);
  },

  render() {
    return (Virtual(
      _.extend({}, this.props,
        { components: this.state.components })
      )
    );
  }
});

var Virtual = name("Virtual", ({manx,components,basePath})=>
    walk(manx,
      ()=> load({},""),
      str=> str,
      function({gn,ga,c},key){
        let props = {key};
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
    })
);

let reactify = function(manx,key,param){
  if (param == null) { param = {}; }
  let {basePath,components} = param;
  if (components != null) {
    return rele(Virtual, {manx,key,basePath,components});
  } else { return rele(DynamicVirtual, {manx,key,basePath}); }
};
export default _.extend(reactify, {walk,Virtual});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
